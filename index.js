const inquirer = require("inquirer");

const Department = require("./lib/department");
const Role = require("./lib/role");
const Employee = require("./lib/employee");

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
  const menu = await mainMenu();

  let showMenu = true;

  while (showMenu) {
    switch (menu.options) {
      case "View all departments":
        break;
      case "View all roles":
        break;
      case "View all employees":
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
