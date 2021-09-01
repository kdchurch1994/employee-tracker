
CREATE TABLE Department ( -- creates the table Department
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL, -- The id is stored as an interger. It will auto-increment (increase by one) each time a department is added to the database
    name VARCHAR(30) -- Stores name as a varliable-length string that has a max of 30 characters
);

CREATE TABLE Role ( -- creates the table Role
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL, -- The id is stored as an interger. It will auto-increment (increase by one) each time a department is added to the database
    title VARCHAR(30), -- Stores title as a varliable-length string that has a max of 30 characters
    salary DECIMAL(7,2), -- Stores the salary as a decimal value. The decimal value can be 7 places (the salary is 7 figures with the largest value of 9999999) with 2 places to the right of the decimal point
    department_id INTEGER, -- stores the department_id as an Integer (this is a foriegn key from the department table)
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES Department(id) -- Creates a CONSTRAINT that declares department_id as a foriegn key of the Department table's id and ensures that the link between the two databases can not be destroyed due to improper use
);

create TABLE Employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30), -- Stores first_name as a varliable-length string that has a max of 30 characters
    last_name VARCHAR(30), -- Stores last_name as a varliable-length string that has a max of 30 characters
    role_id INTEGER, -- stores the role_id as an Integer (this is a foriegn key from the Role table)
    manager_id INTEGER, -- stores the manager_id as an Integer (this is a foriegn key from the Employee table; it uses the id of Employee)
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES Role(id), -- Creates a CONSTRAINT that declares role_id as a foriegn key of the Role table's id and ensures that the link between the two tables can not be destroyed due to improper use
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES Employee(id) -- Creates a CONSTRAINT that declares manager_id as a foriegn key of the Employee table's id and ensures that the link between the two databases can not be destroyed due to improper use
);