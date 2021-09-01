const inquirer = require("inquirer"); //Imports the inquirer npm package to so that we can use inquirer to prompt the user to answer various questions
const server = require("../server"); //Imports the various functions from the server.js file (in our case allows use to use the start function from server.js)
const view = require("./viewQueries"); //Imports the functions from the viewQueries.js file and allows us to call these functions using "view"

const connection = require('../db/connection.js'); //Imports the mysql connection info from the connection.js file

exports.updateEmployeeRole = () => { //Creates a function that allows us to update the role of an employee in the database. exports allows use to export the function to other files in the codebase
    view.getAllEmployees(function (employeeResults) { //calls the function from the viewQueries.js file that gets all Employees from the database and creates a function that stores this info as employeeResults
        var employees = []; //Creates an array that allows us to store the needed info to display the different employee choices to users when choosing to update the role of an employee in the database.
        for (var i = 0; i < employeeResults.length; i++) { // a for loop to cycle through the different employees and push employees full name to the employees array that will be used by inquirer with the various inquirer questions stored in the options array
            var fullName = {
                name: employeeResults[i].first_name + ' ' + employeeResults[i].last_name, //displays the full name of the employee, which is tied to the first_name, last_name, and ID of that employee
                value: {
                    id: employeeResults[i].id,
                    first_name: employeeResults[i].first_name,
                    last_name: employeeResults[i].last_name
                }
            };

            employees.push(fullName) //pushes the full names to the employees array that stores the employee choices for the inquirer prompt
        };

        inquirer.prompt([ //asks the user to select the employee for which the user wants to change the role. 
            {
                type: "list",
                name: "employee",
                message: "Please select which employee you would like to update. (Required)",
                choices: employees

            }
        ])
        .then((answers) => { //stores the responses as answers
            view.getAllRoles(function (roleResults){ //calls the function from the viewQueries.js file that gets all Roles from the database and creates a function that stores this info as roleResults
                var roles = []; //Creates an array that allows us to store the needed info to display the different role choices to users when choosing to add a role to the database. 
                for (var i=0; i < roleResults.length; i++) { // a for loop to cycle through the different role titles and push those roles to the roles array that will be used by inquirer with the various inquirer questions stored in the options array
                    var fullRole = { //creates a variable fullrole that includes the title of the various roles
                        name: roleResults[i].title, 
                        value: {
                            id: roleResults[i].id,
                            role: roleResults[i].title,
                        }
                    }
                    roles.push(fullRole); //pushes the fullRole info to the roles array that will be used by the inquirer prompt
                };

                inquirer.prompt([
                    {
                        type: "list",
                        name: "role",
                        message: `Please select which role you want to assign ${answers.employee.first_name}. (Required)`, //displays the name of the selected employee in the prompt
                        choices: roles
                    }
                ])
                .then((results) => { //stores the inquirer.prompt that asks which role is to be assigned to the selected employee as results
                    connection.query("UPDATE Employee SET role_id = ? WHERE id = ?", [results.role.id, answers.employee.id], //SQL query that updates the role of the employee selected
                    function (err, result) {
                        if (err) throw err; //If there is an error and error message is displayed to the console
                        console.log("You have successfully updated the role of " + answers.employee.first_name + " " + answers.employee.last_name); //If there is no error, the console.log tells the user that they have successfully updated the role of the selected employee and the console.log includes the name of the employee whose role was updated.
                        server.start(); //Restarts the prompt of selections to make
                    })
                });
            });
        });
    });
};