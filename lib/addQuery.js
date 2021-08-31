const inquirer = require('inquirer');
const mysql = require('mysql');
const app = require("../app");
const view = require("./viewQueries.js");

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
            message: "Please enter the name of the department you that would like to add to the database. (Required)"
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

exports.addRole = () => {
    view.getAllDepartments(function(deptResults) {
        var departments = [];
        for (var i = 0; i < deptResults.length; i++) {
            departments.push(deptResults[i].name);
        }
        var options = [
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
        inquirer.prompt(options)
        .then((answers) => {
            var departmentid = null;
            for (var i=0; i <deptResults.length; i++) {
                if (deptResults[i].name === answers.department_id) {
                    departmentid = deptResults[i].id
                }
                console.log(deptResults)
            }
            connection.query("INSERT INTO Role Set ?",
                { 
                    title: answers.title,
                    salary: answers.salary,
                    department_id: departmentid
                },
            function(err, results) {
                if(err) throw err;
                console.log("You have sucessfully added the role " + answers.title + " to the database. ")
                app.start();
            });
        });
    });
}

