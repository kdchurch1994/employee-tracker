const mysql = require('mysql');
const app = require('../app');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'kdchurch',
    password: 'ButlerClass123!',
    database: "cms_db"
});

exports.viewAllEmployees = () => {
    var query = "SELECT * FROM Employee " + 
        "INNER JOIN Role on Employee.role_id = Role.id " +
        "INNER JOIN Department on Role.department_id " +
        "LEFT JOIN Employee AS E2 on Employee.manager_id = E2.id;";
    connection.query(query, function (err, res) {
        if(err) throw err;

        console.table(res);

    app.start();
    
    });
};

exports.getAllRoles = (cb) => {
    connection.query("SELECT * FROM Role", function(err, res) {
        if(err) throw err;
        cb(res);
    });
};

exports.getAllDepartments = (cb) => {
    connection.query("SELECT * FROM Department", function(err,res) {
        if(err) throw err;
        cb(res);

    });
};

exports.getAllEmployees = (cb) => {
    connection.query("SELECT * FROM Employee", function(err, res) {
        if(err) throw err;
        cb(res);
    });
};