const mysql = require("mysql2");
const { printTable } = require("console-table-printer");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function getAllDepartments(mode) {
  return new Promise((res, rej) => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (error, result) => {
      if (error) {
        rej(error.message);
      } else {
        if (mode === "view") {
          printTable(result);
        } else {
          res(result);
        }
      }
    });
  });
}

function getAllRoles(mode) {
  return new Promise((res, rej) => {
    const sql = `SELECT * FROM role`;
    db.query(sql, (error, result) => {
      if (error) {
        rej(error.message);
      } else {
        if (mode === "view") {
          printTable(result);
        } else {
          res(result);
        }
      }
    });
  });
}

function getAllEmployees(mode) {
  return new Promise((res, rej) => {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (error, result) => {
      if (error) {
        rej(error.message);
      } else {
        if (mode === "view") {
          printTable(result);
        } else {
          res(result);
        }
      }
    });
  });
}

function getAllManagers(mode) {
  return new Promise((res, rej) => {
    const sql = `SELECT * FROM employee WHERE manager_id = null`;
    db.query(sql, (error, result) => {
      if (error) {
        rej(error.message);
      } else {
        if (mode === "view") {
          printTable(result);
        } else {
          res(result);
        }
      }
    });
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
  const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
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
  getAllManagers,
  addDepartment,
  addRole,
  addEmployee,
  getAllEmployees,
  updateEmployeeRole,
};
