const mysql = require('mysql'); //imports the use of mysql to create a connection to the mysql database

const connection = mysql.createConnection({ //establishes a connection to the database "cms_db" by logging in as the user "kdchurch" 
    host: 'localhost', //and the password "ButlerClass123!" using port 3306 (the port used by mysql when establishing a connection to the database)
    port: 3306,
    user: 'kdchurch',
    password: 'ButlerClass123!',
    database: "cms_db"
});

module.exports = connection; //exports this connection to be used by other files in the codebase