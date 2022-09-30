const inquirer = require("inquirer");

const Department = require("./lib/department");
const Role = require("./lib/role");
const Employee = require("./lib/employee");
const {
  addDepartment,
  getAllRoles,
  addRole,
  addEmployee,
  getAllEmployees,
  updateEmployeeRole,
  getAllDepartments,
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
  const departments = await getAllDepartments();
  const departmentNames = departments.map((department) => {
    const departmentsInfo = {
      name: department.name,
      value: department.id,
    };
    return departmentsInfo;
  });
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
        type: "list",
        name: "department_id",
        message: "Select a department",
        choices: departmentNames,
      },
    ])
    .then((answer) => {
      return new Role(answer.title, answer.salary, answer.department_id);
    });
}

async function promptForEmployee() {
  const roles = await getAllRoles();
  const roleTitles = roles.map((role) => {
    const roleInfo = {
      name: role.title,
      value: role.id,
    };
    return roleInfo;
  });

  const employees = await getAllEmployees();
  const employeeNames = employees.map((employee) => {
    const employeeInfo = {
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    };
    return employeeInfo;
  });

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
        type: "list",
        name: "role_id",
        message: "Select the role",
        choices: roleTitles,
      },
      {
        type: "list",
        name: "manager_id",
        message: "Select a manager",
        choices: employeeNames,
      },
    ])
    .then((answer) => {
      return new Employee(
        answer.first_name,
        answer.last_name,
        answer.role_id,
        answer.manager_id
      );
    });
}

async function promptForNewEmployeeRole() {
  const employees = await getAllEmployees();
  const employeeNames = employees.map((employee) => {
    const employeeInfo = {
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    };
    return employeeInfo;
  });

  const roles = await getAllRoles();
  const roleTitles = roles.map((role) => {
    const roleInfo = {
      name: role.title,
      value: role.id,
    };
    return roleInfo;
  });

  return inquirer
    .prompt([
      {
        type: "list",
        name: "id",
        message: "Select Employee",
        choices: employeeNames,
      },
      {
        type: "list",
        name: "role_id",
        message: "Select new role",
        choices: roleTitles,
      },
    ])
    .then((answer) => {
      const newRole = { role_id: answer.role_id, id: answer.id };
      console.log(newRole);
      return newRole;
    });
}
async function init() {
  let showMenu = true;

  while (showMenu) {
    const menu = await mainMenu();

    switch (menu.options) {
      case "View all departments":
        getAllDepartments("view");
        break;
      case "View all roles":
        getAllRoles("view");
        break;
      case "View all employees":
        getAllEmployees("view");
        break;
      case "Add a department":
        const department = await promptForDepartment();
        addDepartment(department);
        break;
      case "Add a role":
        const role = await promptForRole();
        addRole(role);
        break;
      case "Add an employee":
        const employee = await promptForEmployee();
        addEmployee(employee);
        break;
      case "Update an employee role":
        const newRole = await promptForNewEmployeeRole();
        updateEmployeeRole(newRole);
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
