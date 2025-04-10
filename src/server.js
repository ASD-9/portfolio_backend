const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.disable("x-powered-by");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongo_uri = process.env.MONGO_URI || "mongodb://root:root@localhost:27017";

mongoose
  .connect(mongo_uri)
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
