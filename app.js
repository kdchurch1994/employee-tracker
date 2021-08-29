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
                "View All Employees",
                "Add an Employee",
                "Update an Employee's Role",
                "Exit"
            ]

        }
    ])
        .then(function(choice) {
            if(choice.options = "View All Employees") {
                view.viewAllEmployees();
            } else if (choice.otions = "Exit") {
                connection.end();
                return;
            }
        });
};
