const express = require("express");
const sequelize = require("./config/connection");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
