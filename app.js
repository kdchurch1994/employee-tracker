const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = ('console.table');
const view = require('./lib/viewQueries')
const add = require('./lib/addQueries');
const update = require('./lib/updateQuery');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'kdchurch',
    password: 'ButlerClass123!',
    database: "cms_db"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("Connection to the database has been established");
    exports.start();
});

const wantToExit = () => {
    inquirer.prompt([
        {
            type: "confirm",
            name: "exit",
            message: "Are you sure you want to exit?",
            default: "Yes"
        }
    ])
};

exports.start = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "Please choose one of the following. (Required)",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee Role",
                "Exit"
            ]

        }
    ])
        .then(function(choice) {
            if(choice.options === "View All Departments") {
                view.viewAllDepartments();
                return;
            } else if (choice.options === "View All Roles") {
                view.viewAllRoles();
                return;
            } else if (choice.options === "View All Employees") {
                view.viewAllEmployees();
                return;
            } else if (choice.options === "Add a Department") {
                add.addDepartment();
                return;
            } else if (choice.options === "Add a Role") {
                add.addRole();
                return;
            } else if (choice.options === "Add an Employee") {
                add.addEmployee();
                return;
            } else if (choice.options === "Update an Employee Role") {
                update.updateEmployeeRole();
                return;
            } else if (choice.options === "Exit") {
                connection.end();
                wantToExit();
                return;
            }
        });
};

