const mysql = require("mysql2");
require("dotenv").config();

export const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_NAME,
    password: process.env.DB_USER,
    database: process.env.DB_PASSWORD,
  },
  console.log(`Connected to the company_db database.`)
);

export function viewDepartment() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log(result);
    }
  });
}

export function viewRole() {
  const sql = `SELECT * FROM role`;
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log(result);
    }
  });
}

export function viewEmployee() {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log(result);
    }
  });
}
