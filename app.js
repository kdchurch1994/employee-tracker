const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = ('console.table');
const view = require('./lib/viewQueries')
const add = require('./lib/addQuery')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'kdchurch',
    password: 'ButlerClass123!',
    database: "cms_db"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("Connection Established");
    exports.start();
});

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
            }else if (choice.options === "Exit") {
                connection.end();
                return;
            }
        });
};
