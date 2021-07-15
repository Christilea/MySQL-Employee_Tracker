USE employeeTracker_db;


INSERT INTO department (name)
VALUES
("Information Technologies"),
("Human Resources"),
("Administration"),
("Operations"),
("Accounting");


INSERT INTO role (title, salary, department_id)
VALUES
("Software Developer", 100000.00, 1),
("Recruiter", 65000.00, 2),
("Business Analyst", 75000.00, 3),
("Operations Manager", 125000.00, 4),
("Executive Accountant", 90000.00,5),
("Senior Software Developer", 130000.00, 1);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("James", "Thompson", 6, 1),
("Calvin", "Smith", 1, NULL),
("Delian", "Jackson", 2, 2),
("Bart", "Jefferson", 3, NULL),
("Collin", "Hinson", 4, 4),
("Jimmy", "Sanders", 4, NULL),
("Elliot", "Shaft", 5, 5),
("Alex", "Johnson", 5, NULL);