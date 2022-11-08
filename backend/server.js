require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT || 5001;

app.listen(5001);
