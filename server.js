const mysql = require("mysql2");
const { printTable } = require("console-table-printer");
require("dotenv").config();

const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the company_db database.`)
);

function viewDepartment() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      printTable(result);
    }
  });
}

function viewRole() {
  const sql = `SELECT * FROM role`;
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      printTable(result);
    }
  });
}

function viewEmployee() {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      printTable(result);
    }
  });
}

function addDepartment(department) {
  const sql = `INSERT INTO department (name) VALUES (?)`;
  const params = [department.name];
  db.query(sql, params, (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log(result);
    }
  });
}

function addRole(role) {
  const sql = `INSERT INTO role (name, salary, department_id) VALUES (?,?,?)`;
  const params = [role.title, role.salary, role.department_id];
  db.query(sql, params, (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log(result);
    }
  });
}

module.exports = {
  viewDepartment,
  viewRole,
  viewEmployee,
  addDepartment,
  addRole,
};
