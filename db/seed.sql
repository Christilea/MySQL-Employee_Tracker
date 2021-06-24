 USE employee_tracker;


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
("Jerry", "Thomas", 6, 1),
("Barry", "Kelly", 1, NULL),
("Delian", "Maxoff", 2, 2),
("Lloyd", "Jefferson", 3, NULL),
("Clide", "Hill", 4, 4),
("Arthur", "Smith", 4, NULL),
("Elliot", "Stop", 5, 5),
("Alex", "Jackson", 5, NULL);