const inquirer = require('inquirer');
const mysql = require('mysql');
const app = require("../app");
//const view = require("./viewQueries.js");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'kdchurch',
    password: 'ButlerClass123!',
    database: "cms_db"
});

exports.addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "Please enter the name of the department you would like to add. (Required)"
        }
    ])
        .then(function(departmentName) {
            connection.query("INSERT INTO Department SET ?",
            {
                name: departmentName
            },
            function(err, results) {
                if(err) throw err;
                console.log("You Successfully added " + departmentName + " to the database. ");
                app.start();
            });
        });
    
};