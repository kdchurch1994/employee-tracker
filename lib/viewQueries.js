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
    var query = "SELECT E1.id, E1.first_name, E1.last_name, E2.first_name as manager_firstName, E2.last_name as manager_lastName, Role.title, Role.salary, Department.name FROM Employee E1 " + 
        "LEFT JOIN Employee E2 on E1.manager_id = E2.id " +
        "INNER JOIN Role on E1.role_id = Role.id " +
        "INNER JOIN Department on Role.department_id = Department.id ;" 
    
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