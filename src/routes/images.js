const express = require("express");
const router = express.Router();
const axios = require("axios");
const ImageState = require("../global_data/ImageState");
const ListEmptyException = require("../exceptions/ListEmptyException");
const KeyNotExistInObjectException = require("../exceptions/KeyNotExistInObjectException");
const KeyTypeNotSupportedException = require("../exceptions/KeyTypeNotSupportedException");
const ListNotArrayException = require("../exceptions/ListNotArrayException");
const NonObjectInListException = require("../exceptions/NonObjectInListException");
const sorter = require("../services/sort.service");

const PER_PAGE = 9;

router.get("/category", async (req, res) => {
  let CATEGORY = req.query.category;
  const KEY = process.env.KEY;
  const PAGE = +req.query.page - 1;
  const OFFSET = PAGE * PER_PAGE;
  const category_state = ImageState.getKey(CATEGORY);
  if (category_state) {
    console.log("cached hit", category_state.slice(OFFSET, OFFSET + PER_PAGE));
    const remaining_pre = category_state.length - (OFFSET + PER_PAGE);
    const remaining = remaining_pre <= 0 ? 0 : remaining_pre;
    const response = {
      isSuccess: true,
      remaining,
      data: category_state.slice(OFFSET, OFFSET + PER_PAGE),
    };
    res.status(200).json(response);
    return;
  }

  try {
    console.log("cache miss:", CATEGORY);
    const data = await axios.get(
      `https://pixabay.com/api/?key=${KEY}&q=${CATEGORY}`
    );
    ImageState.setImages(CATEGORY, data.data.hits);
    console.log("new category", ImageState.getImages());

    const category_state = ImageState.getKey(CATEGORY);
    const remaining_pre = category_state.length - (OFFSET + PER_PAGE);
    const remaining = remaining_pre <= 0 ? 0 : remaining_pre;
    const result = data.data.hits.slice(0, PER_PAGE);
    const response = { isSuccess: true, remaining, data: result };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json("error during fetch");
  }
});

router.post("/sort", async (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }
  const sort_by = req.body.sort_by;
  const order_asc = req.body.order_asc;
  const CATEGORY = req.body.category;
  const PAGE = req.body.page - 1;
  const OFFSET = PAGE * PER_PAGE;
  const category_state = ImageState.getKey(CATEGORY);
  const remaining_pre =
    category_state.length - (OFFSET + PER_PAGE);
  const remaining = remaining_pre <= 0 ? 0 : remaining_pre;

  console.log(`sort-${sort_by}, order-${order_asc}`);

  let  list_to_sort = [];
  if (category_state) {
    list_to_sort = category_state.slice(OFFSET, OFFSET + PER_PAGE)
  }

  if (sort_by === undefined || order_asc === undefined) {
    const response = { data: list_to_sort, remaining, isSuccess: false };
    res.status(400).json(response);
    return;
  }

  try {
    await sorter.sortByField(list_to_sort, sort_by, order_asc);

    const response = { isSuccess: true, remaining, data: list_to_sort };

    res.status(200).json(response);
  } catch (err) {
    if (err instanceof ListEmptyException) {
      console.log(err.message);
      res.status(500).json(err.message);
      return;
    } else if (err instanceof KeyNotExistInObjectException) {
      console.log(err.message);
      res.status(500).json(err.message);
      return;
    } else if (err instanceof KeyTypeNotSupportedException) {
      console.log(err.message);
      res.status(500).json(err.message);
      return;
    } else if (err instanceof ListNotArrayException) {
      console.log(err.message);
      res.status(500).json(err.message);
      return;
    } else if (err instanceof NonObjectInListException) {
      console.log(err.message);
      res.status(500).json(err.message);
      return;
    } else {
      console.log("no errors");
    }
  }
});

// Original implementation fetching using pagination via pixabay api
// This is not efficient because everytime you switch pages you're calling the api again
// even though its the same data.
// categoryRouter.get("/", async (req, res) => {
//     //
//   const CATEGORY = req.query.category;
//   const PAGE = req.query.page;
//   const PER_PAGE = req.query.per_page;
//   const KEY = process.env.KEY;

//   try {
//     const data = await axios.get(
//       `https://pixabay.com/api/?key=${KEY}&q=${CATEGORY}&page=${PAGE}&per_page=${PER_PAGE}`
//     );
//     // if sorting parameter
//     if(req.query.sort){
//         //sort the results
//     }
//     res.status(200).json(data.data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json("error during fetch");
//   }
// });

module.exports = router;
