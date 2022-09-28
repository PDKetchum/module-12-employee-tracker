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
  addEmployee,
  getAllEmployees,
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
        name: "name",
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

async function promptForEmployee() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter first name",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter last name",
      },
      {
        type: "input",
        name: "role_id",
        message: "Enter the role ID",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Enter the manager ID (null if no manager)",
      },
    ])
    .then((answer) => {
      return new Employee(
        null,
        answer.first_name,
        answer.last_name,
        answer.role_id,
        answer.manager_id
      );
    });
}

async function promptForNewEmployeeRole() {
  const employees = getAllEmployees();
  const employeeNames = employees.map((employee) => {
    return `${employee.first_name} ${employee.last_name}`;
  });

  return inquirer
    .prompt([
      {
        type: "list",
        name: "name",
        message: "Select Employee",
        choices: employeeNames,
      },
      {
        type: "input",
        name: "role_id",
        message: "Enter the new role ID",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Enter the new manager ID (null if no manager)",
      },
    ])
    .then((answer) => {
      return new Employee(answer.id, answer.role_id, answer.manager_id);
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
        getAllEmployees("view");
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
        const employee = promptForEmployee();
        addEmployee(employee);
        break;
      case "Update an employee role":
        const newRole = promptForNewEmployeeRole();
        addNewEmployeeRole(newRole);
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
