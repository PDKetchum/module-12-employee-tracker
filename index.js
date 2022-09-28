const inquirer = require("inquirer");

const Department = require("./lib/department");
const Role = require("./lib/role");
const Employee = require("./lib/employee");
const { db, viewDepartment, viewRole, viewEmployee } = require("./server");

async function mainMenu() {
  return inquirer.prompt([
    {
      type: "list",
      name: "options",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Quit",
      ],
    },
  ]);
}

async function init() {
  let showMenu = true;

  while (showMenu) {
    const menu = await mainMenu();
    switch (menu.options) {
      case "View all departments":
        viewDepartment();
        break;
      case "View all roles":
        viewRole();
        break;
      case "View all employees":
        viewEmployee();
        break;
      case "Add a department":
        break;
      case "Add a role":
        break;
      case "Add an employee":
        break;
      case "Update an employee role":
        break;
      default:
        showMenu = false;
    }
  }
}

init();
