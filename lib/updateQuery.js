const inquirer = require("inquirer");
const mysql = require("mysql");
const app = require("../app");
const view = require("./viewQueries");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'kdchurch',
    password: 'ButlerClass123!',
    database: "cms_db"
});

exports.updateEmployeeRole = () => {
    view.getAllEmployees(function (employeeResults) {
        var employees = [];
        for (var i = 0; i < employeeResults.length; i++) {
            var fullName = {
                name: employeeResults[i].first_name + ' ' + employeeResults[i].last_name,
                value: {
                    id: employeeResults[i].id,
                    first_name: employeeResults[i].first_name,
                    last_name: employeeResults[i].last_name
                }
            };

            employees.push(fullName)
        };

        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Please select which employee you would like to update. (Required)",
                choices: employees

            }
        ])
        .then((answers) => {
            view.getAllRoles(function (roleResults){
                var roles = [];
                for (var i=0; i < roleResults.length; i++) {
                    var fullRole = {
                        name: roleResults[i].title, 
                        value: {
                            id: roleResults[i].id,
                            role: roleResults[i].title,
                        }
                    }
                    roles.push(fullRole);
                };

                inquirer.prompt([
                    {
                        type: "list",
                        name: "role",
                        message: `Please select which role you want to assign ${answers.employee.first_name}. (Required)`,
                        choices: roles
                    }
                ])
                .then((results) => {
                    connection.query("UPDATE Employee SET role_id = ? WHERE id = ?", [results.role.id, answers.employee.id], 
                    function (err, result) {
                        if (err) throw err;
                        console.log("You have successfully updated the role of " + answers.employee.first_name + " " + answers.employee.last_name);
                        app.start();
                    })
                });
            });
        });
    });
};