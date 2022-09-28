const inquirer = require("inquirer");

const Department = require("./lib/department");
const Role = require("./lib/role");
const Employee = require("./lib/employee");
const {
  viewDepartment,
  viewRole,
  viewEmployee,
  addDepartment,
  addRole,
} = require("./server");

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

async function promptForDepartment() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the department name",
      },
    ])
    .then((answer) => {
      return new Department(null, answer.name);
    });
}

async function promptForRole() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the title",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary",
      },
      {
        type: "input",
        name: "department_id",
        message: "Enter the department ID",
      },
    ])
    .then((answer) => {
      return new Role(null, answer.title, answer.salary, answer.department_id);
    });
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
        const department = promptForDepartment();
        addDepartment(department);
        break;
      case "Add a role":
        const role = promptForRole();
        addRole(role);
        break;
      case "Add an employee":
        break;
      case "Update an employee role":
        break;
      default:
        showMenu = false;
    }

    // Needed to prevent the prompt from overlapping the console logs
    await sleep(500);
  }

  console.log("Goodbye!");
  process.exit(0);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

init();
