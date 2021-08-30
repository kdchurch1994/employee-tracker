const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = ('console.table');
const view = require('./lib/viewQueries')

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
                "Exit"
            ]

        }
    ])
        .then(function(choice) {
            if(choice.options = "View All Departments") {
                view.viewAllDepartments();
            } else if (choice.options = "View All Roles") {
                view.viewAllRoles();
            } else if (choice.options = "View All Employees") {
                view.viewAllEmployees();
            }
            
        });
};
