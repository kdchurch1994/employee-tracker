const inquirer = require('inquirer'); //Imports the inquirer npm package to so that we can use inquirer to prompt the user to answer various questions
const server = require('../server'); //Imports the various functions from the server.js file (in our case allows use to use the start function from server.js)
const view = require('./viewQueries.js'); //Imports the functions from the viewQueries.js file and allows us to call these functions using "view"

const connection = require('../db/connection.js'); //Imports the mysql connection info from the connection.js file

exports.addDepartment = () => { //Creates a function that adds a department to the database. exports allows use to export the function to other files in the codebase
    inquirer.prompt([ //Asks the user if they would like to add a department name
        {
            type: "input",
            name: "name",
            message: "Please enter the name of the department you that would like to add to the database. (Required)"
        }
    ])
        .then(function(name) { //Once the user enters a name, an id is auto-generated and the new Department is added to the database
            connection.query("INSERT INTO Department SET ?", name, function (err, result) { //creates a query that allows us to insert values into the Department table
                if(err) throw err; //If there is an error and error message is displayed to the console
                console.log("You Successfully added a department to the database. "); //If no errors, the console.log tells the user that a department has been added to the database
            server.start(); //calls the start function from server.js that starts the question prompt after the addDepartment query is completed successfully
            });
        });      
}

exports.addRole = () => { //Creates a function that adds a role to the database. exports allows use to export the function to other files in the codebase.
    view.getAllDepartments(function(deptResults) { //calls the function from the viewQueries.js file that gets all Departments from the database and creates a function that stores this info as deptResults
        var departments = []; //Creates an array that allows us to store the needed info to display the different department choices to users when choosing to add a role to the database. 
        for (var i = 0; i < deptResults.length; i++) { //a for loop to cycle through each department 
            departments.push(deptResults[i].name); //Pushes the various department names to the departments array
        }
        var options = [ //The options array is being used to store the inquirer questions needed to add a role to the database. 
            {
                type: "input",
                name: "title",
                message: "Please enter the name of the role that you would like to add to the database. (Required)"
            },
            {
                type: "input",
                name: "salary",
                message: "Please enter the salary associated with this role. (Required)"
            },
            {
                type: "list",
                name: "department_id",
                message: "Please select the department that this role belongs. (Required)",
                choices: departments
            }
        ];
        inquirer.prompt(options) //passes options through the inquirer.prompt
        .then((answers) => { //stores the responses as answers
            var departmentid = null; //stores departmentid as a null value
            for (var i=0; i <deptResults.length; i++) { // a for loop to cycle through the results and sets the value departmentid to each department id in the index
                if (deptResults[i].name === answers.department_id) { //Allows us to assign the id that is associated with the selected name of the department that the new role belongs to. 
                    departmentid = deptResults[i].id
                }
            }
            connection.query("INSERT INTO Role Set ?", //Query that inserts the new role's title, salary, and adds the department_id of the department that the role belongs to
                { 
                    title: answers.title,
                    salary: answers.salary,
                    department_id: departmentid
                },
            function(err, results) {
                if(err) throw err; //If there is an error, than an error message is displayed
                console.log("You have sucessfully added the role " + answers.title + " to the database. ") //If there is no error, the console.log tells the user that they have successfully added that role to the database and it includes the name of the role that was added
                server.start(); //Restarts the prompt of selections to make
            });
        });
    });
}

exports.addEmployee = () => { //Creates a function that adds an employee to the database. exports allows use to export the function to other files in the codebase.
    view.getAllRoles(function(roleResults) { //calls the function from the viewQueries.js file that gets all Roles from the database and creates a function that stores this info as roleResults
        var roles = []; //Creates an array that allows us to store the needed info to display the different role choices to users when choosing to add a role to the database. 
        for(var i = 0; i < roleResults.length; i++) { // a for loop to cycle through the different role titles and push those roles to the roles array that will be used by inquirer with the various inquirer questions stored in the options array
            roles.push(roleResults[i].title);
        }
        var options = [ //creates an options array to store the questions that will be used by the inquirer prompt
            {
                type: "input",
                name: "first_name",
                message: "Please enter the first name of the employee that you would like to add to the database. (Required)"
            },
            {
                type: "input",
                name: "last_name",
                message: "Please enter the last name of the employee that you are trying to add to the database. (Required)"
            },
            {
                type: "list",
                name: "role",
                message: "Please select the role of the employee that you are trying to add to the database. (Required)",
                choices: roles
            },
            {
                type: "number",
                name: "managerID",
                message: "Please enter the ID of the manager of this employee."
            }
        ];

        inquirer.prompt(options) //passes options through the inquirer.prompt
        .then((answers) => { //stores the responses as answers
            var roleID = null; //stores roleid as a null value
            for(var i=0; i< roleResults.length; i++) { // a for loop to cycle through the results and sets the value roleid to each role_id in the index
                if(roleResults[i].title === answers.role) { //Allows us to assign the id that is associated with the selected title of the role that the id belongs to.
                    roleID = roleResults[i].id
                }
            }
            connection.query("INSERT INTO Employee SET ?", //SQL Query that inserts the values "first_name, last_name, role_id, and manager_id" into the employee table by using the answers from the inquirer prompt
                {                                          //The employee id is already added through the use of auto-incrementation
                    first_name: answers.first_name,
                    last_name: answers.last_name,
                    role_id: roleID,
                    manager_id: answers.managerID
                },
            function(err, results) { 
                if(err) throw err; //If there is an error and error message is displayed to the console
                console.log("You have successfully added " + answers.first_name + " " + answers.last_name); //If there is no error, the console.log tells the user that they have successfully added that emloyee to the database and it includes the name of the new employee
                server.start(); //Restarts the prompt of selections to make
            });
        });   
    });
};