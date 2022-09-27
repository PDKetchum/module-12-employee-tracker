const inquirer = require("inquirer");

const Department = require("./lib/department");
const Role = require("./lib/role");
const Employee = require("./lib/employee");

async function mainMenu() {
  return inquirer.prompt([
    {
      type: "list",
      options: "options",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
      ],
    },
  ]);
}

async function init() {
  const menu = await mainMenu();
}

init();
