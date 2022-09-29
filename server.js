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

function getAllDepartments(mode) {
  const sql = `SELECT * FROM department`;
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      if (mode === "view") {
        printTable(result);
      } else {
        return result;
      }
    }
  });
}

function getAllRoles(mode) {
  const sql = `SELECT * FROM role`;
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      if (mode === "view") {
        printTable(result);
      } else {
        return result;
      }
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

function addEmployee(employee) {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
  const params = [
    employee.first_name,
    employee.last_name,
    employee.role_id,
    employee.manager_id,
  ];
  db.query(sql, params, (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log(result);
    }
  });
}

function getAllEmployees(mode) {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      if (mode === "view") {
        printTable(result);
      } else {
        return result;
      }
    }
  });
}

function updateEmployeeRole(employee) {
  const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
  const params = [employee.role_id, employee.employee_id];
  db.query(sql, params, (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log(result);
    }
  });
}

module.exports = {
  getAllDepartments,
  getAllRoles,
  addDepartment,
  addRole,
  addEmployee,
  getAllEmployees,
  updateEmployeeRole,
};
