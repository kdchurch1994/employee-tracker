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
    var employeeQuery = "SELECT E1.id, E1.first_name, E1.last_name, E2.first_name as manager_firstName, E2.last_name as manager_lastName, Role.title, Role.salary, Department.name FROM Employee E1 " + 
        "LEFT JOIN Employee E2 on E1.manager_id = E2.id " +
        "INNER JOIN Role on E1.role_id = Role.id " +
        "INNER JOIN Department on Role.department_id = Department.id ;" 
    
    connection.query(employeeQuery, function (err, res) {
        if(err) throw err;

        console.table(res);

    app.start();
    
    });
};

exports.viewAllRoles = () => {
    var roleQuery = "SELECT R1.id as role_id, R1.title as role_name, R1.department_id, Department.name FROM Role R1 " + "INNER JOIN Department on Role.department_id = Department.id ;"
    
    connection.query(roleQuery, function (err, res) {
        if(err) throw err;

        console.table(res);

    app.start();

    });
       
};

exports.viewAllDepartments = () => {
    var departmentQuery = "SELECT D1.id as department_id, D1.name as department_name FROM Department D1 ;"
        
    connection.query(departmentQuery, function (err, res) {
        if(err) throw err;

        console.table(res);
    
    app.start();
    })
};

// exports.getAllEmployees = (cb) => {
//     connection.query("SELECT * FROM Employee", function(err, res) {
//         if(err) throw err;
//         cb(res);
//     });
// };