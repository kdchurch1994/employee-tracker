
CREATE TABLE Department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(30)
);

CREATE TABLE Role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(7,2), 
    department_id INTEGER, 
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES Department(id) 
);

create TABLE Employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER, 
    manager_id INTEGER,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES Role(id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES Employee(id) 
);