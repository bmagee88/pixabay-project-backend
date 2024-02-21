const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const port = process.env.PORT;
const ImageRouter = require("./src/routes/images");
const cors = require('cors');
const ImageState = require("./src/global_data/ImageState");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Accept, Content-Type, Authorization, X-Requested-With"
//   );
//   next();
// });

app.use("/", ImageRouter);
// setInterval(()=>{console.log(ImageState.getImages())},5000)


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
