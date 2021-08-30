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
            name: "name",
            message: "Please enter the name of the department you would like to add. (Required)"
        }
    ])
        .then(function(name) {
            connection.query("INSERT INTO Department SET ?", name, function (err, result) {
                if(err) throw err;
                console.log("You Successfully added a department to the database. ");
            app.start();
            });
        });      
}

