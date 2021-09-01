
const server = require('../server'); //Imports the various functions from the server.js file (in our case allows use to use the start function from server.js)

const connection = require('../db/connection.js'); //Imports the mysql connection info from the connection.js file

exports.viewAllEmployees = () => { //Creates a function that allows us to query for the employees and displays them in the console. exports allows us to use the function in other files if needed
    //The SQL query is requesting that information through various aliases and joins to display employee information including the first and last name of the employe, their role title, the department they belong too and who their manager is
    var employeeQuery = "SELECT E1.id, E1.first_name, E1.last_name, E2.first_name as manager_firstName, E2.last_name as manager_lastName, Role.title, Role.salary, Department.name FROM Employee E1 " + 
        "LEFT JOIN Employee E2 on E1.manager_id = E2.id " +
        "INNER JOIN Role on E1.role_id = Role.id " +
        "INNER JOIN Department on Role.department_id = Department.id ;" 
    
    connection.query(employeeQuery, function (err, res) {
        if(err) throw err; //If there is an error and error message is displayed to the console

        console.table(res); //stores the results of the queries in a table that can be displayed to the console

    server.start(); //Restarts the prompt of selections to make
    
    });
};

exports.viewAllRoles = () => { //Creates a function that allows us to query for the roles and displays them in the console. An INNER JOIN is being used to display the department_id from the Department table. exports allows use to export the function to other files if needed
    var roleQuery = "SELECT R1.id as role_id, R1.title as role_name, R1.department_id, Department.name as department_name FROM Role R1 " + "INNER JOIN Department on R1.department_id = Department.id ;"
    
    connection.query(roleQuery, function (err, res) {
        if(err) throw err; //If there is an error and error message is displayed to the console

        console.table(res); //stores the results of the queries in a table that can be displayed to the console

    server.start(); //Restarts the prompt of selections to make

    });
       
};

exports.viewAllDepartments = () => { //Creates a function that allows us to query for the departments and displays them in the console. exports allows use to export the function to other files if needed
    var departmentQuery = "SELECT D1.id as department_id, D1.name as department_name FROM Department D1 ;"
        
    connection.query(departmentQuery, function (err, res) {
        if(err) throw err; //If there is an error and error message is displayed to the console


        console.table(res); //stores the results of the queries in a table that can be displayed to the console
    
    server.start(); //Restarts the prompt of selections to make
    })
};

exports.getAllDepartments = (cb) => { //function used to get all departments that will be called by the addRole function
    connection.query("SELECT * FROM Department", function(err, res) {
        if(err) throw err;
        cb(res);
    });
};

exports.getAllRoles = (cb) => { //function used to gett all the roles that will be called in the addEmployee function
    connection.query("SELECT * FROM Role", function(err, res) {
        if(err) throw err;
        cb(res);
    });
};

exports.getAllEmployees = (cb) => { //function that gets all the employees that will be called in the updateEmployeeRole function
    connection.query("SELECT * FROM Employee", function(err, res) {
        if(err) throw err;
        cb(res);
    });
};