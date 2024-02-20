const express = require("express");
const app = express();
require("dotenv").config();
const axios = require("axios");
const bodyParser = require("body-parser");
const sorter = require("./src/services/sort.service");
const port = process.env.PORT;
const ListEmptyException = require("./src/exceptions/ListEmptyException");
const KeyNotExistInObjectException = require("./src/exceptions/KeyNotExistInObjectException");
const KeyTypeNotSupportedException = require("./src/exceptions/KeyTypeNotSupportedException");
const ListNotArrayException = require("./src/exceptions/ListNotArrayException");
const NonObjectInListException = require("./src/exceptions/NonObjectInListException");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Content-Type, Authorization, X-Requested-With"
  );
  next();
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.get("/category", async (req, res) => {
  const CATEGORY = req.query.category;
  const PAGE = req.query.page;
  const PER_PAGE = req.query.per_page;
  const KEY = process.env.KEY;
  try {
    const data = await axios.get(
      `https://pixabay.com/api/?key=${KEY}&q=${CATEGORY}&page=${PAGE}&per_page=${PER_PAGE}`
    );
    res.status(200).json(data.data);
  } catch (err) {
    console.log(err);
    res.status(500).json("error during fetch");
  }
});

app.post("/sort", async (req, res) => {
  console.log("got sort")
  if (!req.body) {
    return res.sendStatus(400);
  }
  const list_to_sort = req.body.list_to_sort;
  const sort_by = req.body.sort_by;
  const order_asc = req.body.order_asc;

  console.log("got order_asc")
  try {
    console.log("got try")
    await sorter.sortByField(list_to_sort, sort_by, order_asc);
    console.log("got sortByField")
    res.status(200).json(list_to_sort);
  } catch (err) {
    console.log("got err")
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
  
  res.status(900).json("no errors, expected errors");
});
