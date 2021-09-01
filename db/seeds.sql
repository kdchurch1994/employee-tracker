INSERT INTO Department (name) VALUES ('Grocery'), ('Cashiers'), ('Stockers'), ('Frozen'), ('Meat'), ('Produce'); --Inserts the departments Grocery, Cashiers, Stockers, Frozen, Meat, and Produce into the Department table
INSERT INTO Role (title, salary, department_id) VALUES -- Inserts the listed values into the Role table
('Grocery Manager', 80000.00, 1),
('Cashier', 40000.00, 2),
('Stocker', 40000.00, 3),
('Produce Manager', 65000.00, 4),
('Meat Manager', 65000.00, 5),
('Frozen Manager', 65000.00, 6);

INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES -- Inserts the following Employee information into the Employee table of the database
('Benjamin', 'Jones', 1, null),
('Sharon', 'Williams', 6, null),
('Samantha', 'Mcphearson', 5, null),
('Issac', 'Frazier', 4, null),
('John', 'Smith', 2, 1),
('Charles', 'Williams', 2, 1),
('Sheryl', 'Masterson', 3, 1),
('Mason', 'Jackson', 3, 2),
('Denise', 'Everson', 3, 4),
('Jefferson', 'Jefferies', 3, 3),
('Alex', 'Wilson', 2, 1),
('Jason', 'Michaels', 3, 1);