const inquirer = require('inquirer'); //Imports the inquirer npm package to so that we can use inquirer to prompt the user to answer various questions
const view = require('./lib/viewQueries') //Imports the functions from the viewQueries.js file and allows us to call these functions using "view"
const add = require('./lib/addQueries'); //Imports the functions from the addQueries.js file and allows us to call these functions using "add"
const update = require('./lib/updateQuery'); //Imports the function from the updateQuery.js file and allows us to call the functions using "update"

const connection = require('./db/connection.js'); //Imports the mysql connection info from the connection.js file

connection.connect(function(err) {
    if(err) throw err; //If there is an error, than an error message is displayed
    console.log("Connection to the database has been established");
    exports.start(); //calls the start function and exports the function to be used by other files in the code base
});

const wantToExit = () => { //creates the function wantToExit that confirms that the user wants to exit the prompt. This will be called by the start function
    inquirer.prompt([
        {
            type: "confirm",
            name: "exit",
            message: "Are you sure you want to exit?",
            default: "Yes" //The default is Yes so if the user enters nothing they will exit the prompt
        }
    ])
};

exports.start = () => { //creates the start function that prompts the user to make a selection for what they would like to do 
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
        .then(function(choice) { //creates the choices function that will use the selected option to determine what will occur next
            if(choice.options === "View All Departments") { //if selected, all departments are displayed to the user
                view.viewAllDepartments();
                return;
            } else if (choice.options === "View All Roles") { //if selected, all roles are displayed to the user
                view.viewAllRoles();
                return;
            } else if (choice.options === "View All Employees") { //if selected, all employees are displayed to the user
                view.viewAllEmployees();
                return;
            } else if (choice.options === "Add a Department") { //if selected, the user will be able to add a department to the database
                add.addDepartment();
                return;
            } else if (choice.options === "Add a Role") { //if selected, the user will be able to add a role to the database
                add.addRole();
                return;
            } else if (choice.options === "Add an Employee") { //if selected, the user will be able to add an employee to the database
                add.addEmployee();
                return;
            } else if (choice.options === "Update an Employee Role") { //if selected, the user can update the role of an employee
                update.updateEmployeeRole();
                return;
            } else if (choice.options === "Exit") { //if selected, calls the wantToExit function that will allow the user to exit the application
                connection.end();
                wantToExit();
                return;
            }
        });
};

