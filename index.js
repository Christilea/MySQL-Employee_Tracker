//Imports
// require('dotenv').config()
const inquirer = require("inquirer");
const connection = require("./db/connection")
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`)
main();
});

// View all employees
const viewAll = () => {
    // Query database and display rows
    const query = "SELECT * FROM employee";
    connection.query(query, (err, results) => {
        if(err) throw err;
        console.table(results);
        main();
    });
}

// View Employees by Role
const viewByRole = () => {
    // Ask Question
    inquirer.prompt([{
        type: "list",
        choices: [
            "1 Software Developer", 
            "2 Recruiter", 
            "3 Business Analyst", 
            "4 Operations Manager", 
            "5 Executive Accountant", 
            "6 Senior Software Developer", 
        ],
        message: "Choose which role you want to see",
        name: "choice"
    }])
    .then(response => {
        // Query Database and display rows
        const query = `SELECT * FROM employee where role_id = ${Number.parseInt(response.choice.charAt(0))}`;
        connection.query(query, (err, results) => {
            if(err) throw err;
            console.table(results);
            main();
        })
    })
}

// View Employee by department
const viewByDep = () => {
    inquirer.prompt([{
        type: "list",
        choices: [
            "1 Information Technologies", 
            "2 Human Resources", 
            "3 Administration",
            "4 Operations", 
            "5 Accounting", 
        ],
        message: "Select a Department:",
        name: "choice"
    }])
    .then(response => {
        // Query the Database and display rows
        const query = `select * from employee as e left join role as r on e.role_id = r.id where r.id = ${Number.parseInt(response.choice.charAt(0))}`;
        connection.query(query, (err, results) => {
            if(err) throw err;
            console.table(results);
            main();
        })
    })
}

// View all Departments
const viewDep = () => {
    const query = `select * from department;`;
    connection.query(query, (err, results) => {
        if(err) throw err;
        console.table(results);
        main();
    });
}

// View all Roles
const viewRoles = () => {
    const query = `select * from role;`;
    connection.query(query, (err, results) => {
        if(err) throw err;
        console.table(results);
        main();
    });
}

// Add employee to database
const addEmp = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter First Name:",
            name: "FirstName"
        },
        {
            type: "input",
            message: "Enter Last Name:",
            name: "LastName"
        },
        {
            type: "list",
            choices: [
                "1 Software Developer",
                "2 Recruiter", 
                "3 Business Analyst", 
                "4 Operations Manager",
                "5 Executive Accountant", 
                "6 Senior Software Developer", 
            ],
            message: "Which role is this employee",
            name: "role"
        },
        {
            type: "list",
            choices: [
                "1 ","James Thompson",
                "2 ","Delian Jackson", 
                "3 ","Bart Jefferson", 
                "4 ","Collin Hinson",
                "5 ","Elliot Shaft",
                "None",
            ],
            message: "Who is this employees Manager?",
            name: "manager"
        }
    ])
    .then(response => {
        const parsedRole = response.role.split(" ");
        const parsedManager = response.manager.split(" ");
        const query = `insert into employee(first_name, last_name, role_id, manager_id)values("${response.fname}", "${response.lname}", ${Number.parseInt(parsedRole)}, ${Number.parseInt(parsedManager)})`;
        connection.query(query, (err, results) => {
            if (err) {
                throw err;
            } else {
                console.log("\nSuccessfully added Employee");
            }
            main();
        });
    })
}

// Add a department to db
const addDep = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the Department?",
            name: "name"
        }
    ])
    .then(response => {
        const query = `insert into department (name) values("${response.name}")`;
        connection.query(query, (err, results) => {
            if(err) throw err;
            console.log(results);
            main();
        })
    })
}

// Add Roles
const addRole = () => {
    //Grab all departments and store them in departments array
    const query = `select * from department;`;
    connection.query(query, (err, results) => {
        const departments = [];
        for(let i = 0; i < results.length; i++) {
            departments.push(`${results[i].id} ${results[i].name}`);
        }
        //Get user input for role
        inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the Role?",
                name: "name"
            },
            {
                type: "input",
                message: "What is the salary?",
                name: "salary"
            },
            {
                type: "list",
                choices: [...departments],
                message: "Choice which department it belongs to:",
                name: "department"
            }
        ])
        .then(response => {
            // persist it into role table
            const id = response.department.split(" ")[0];
            console.log(id);
            const queryTwo = `insert into role (title, salary, department_id) values("${response.name}", ${Number.parseFloat(response.salary)}, ${Number.parseInt(id)})`;
            connection.query(queryTwo, (err, results) => {
                if(err) throw err;
                console.log(results);
                main();
            })
        })
    })
}

// Remove an Employee
const removeEmp = async() => {
    const queryOne = `select id, first_name, last_name from employee;`;
    connection.query(queryOne, (err, results) => {
        // fullNames = [...results];
        // for(let i = 0; i < results.length; i++) {
        //     fullNames.push(`${results[i].id} ${results.fname} ${results.lname}`);
        // }
        // console.table(fullNames);
        const fullNames = [];
        for(let i = 0; i < results.length; i++) {
            fullNames.push(`${results[i].id} ${results[i].first_name} ${results[i].last_name}`);
        }
        inquirer.prompt([
            {
                type: "list",
                choices: [...fullNames],
                message: "Which Employee will be removed?",
                name: "choice"
            }
        ])
        .then(response => {
            const id = response.choice.split(" ");
            const queryTwo = `delete from employee where id = ${Number.parseInt(id[0])}`;
            connection.query(queryTwo, (err, results) => {
                if (err) throw err;
                console.log("\nSuccessfully Removed Employee");
                main();
            })
        })
    });
}

// Updates the Employees Role
const updateRole= () => {
    const queryOne = `select id, first_name, last_name from employee;`;
    connection.query(queryOne, (err, results) => {
        const fullNames = [];
        for(let i = 0; i < results.length; i++) {
            fullNames.push(`${results[i].id} ${results[i].first_name} ${results[i].last_name}`);
        }
        inquirer.prompt([
            {
                type: "list",
                choices: [...fullNames],
                message: "Pick the Employee:",
                name: "choice"
            },
            {
               type: "list",
                choices: [1,2,3,4,5,6],
                message: "Pick which role to update for Employee:",
                name: "role"
            }
        ])
        .then(response => {
            const id = response.choice.split(" ");
            const queryTwo = `update employee set role_id = ${response.role} where id = ${Number.parseInt(id)}`;
            connection.query(queryTwo, (err, results) => {
                if (err) throw err;
                console.log("Successfully Updated Employees Role");
                main();
            })
        });
    });
}

// Updates Manager status
const updateManager = () => {
    const queryOne = `select id, first_name, last_name from employee;`;
    connection.query(queryOne, (err, results) => {
        const fullNames = [];
        for(let i = 0; i < results.length; i++) {
            fullNames.push(`${results[i].id} ${results[i].first_name} ${results[i].last_name}`);
        }
        inquirer.prompt([
            {
                type: "list",
                choices: [...fullNames],
                message: "Pick the Employee:",
                name: "choice"
            },
            {
                type: "list",
                choices: [1,2,3,4,5,6,"null"],
                message: "Pick which Manager to update for Employee:",
                name: "role"
            }
        ])
        .then(response => {
            const id = response.choice.split(" ");
            const queryTwo = `update employee set manager_id = ${response.role} where id = ${Number.parseInt(id)}`;
            connection.query(queryTwo, (err, results) => {
                if (err) throw err;
                console.log("\nSuccessfully Updated Employees Role");
                main();
            })
        });
    });
}

// This is the main function where the user is given choices
const main = () => {
    //  users input
    inquirer.prompt([{
            type: "list",
            choices: [
                "View All Employees?",
                "View  All Departments?",
                "View All Employees by Department?",
                "View Employees by Role?", 
                "View All Roles?", 
                "View All Employees by Role?",
                "Add Employee?", 
                "Add Department?",
                "Add Role?",
                "Remove Employee?", 
                "Update Employee Role?", 
                "Update Employee Manager?", 
                "Stop?", 
            ],
            message: "What would you like to do?",
            name: "choice"
        }])
        .then(response => {
            // show all employees
            if (response.list === "View All Employees") {
                viewAll();
            
            } else if (response.list === "View Employees by Department") {
                viewByDep();
            
            } else if (response.list === "View Employees by Role") {
                viewByRole();
            
            } else if(response.list === "View All Roles") {
                viewRoles();
            
            } else if(response.list === "View All Departments") {
                viewDep();
            
            } else if (response.list === "Add Employee") {
                addEmp();
            
            } else if (response.list === "Add Department") {
                addDep();
            
            } else if (response.list === "Add Employee Role") {
                addRole();
            
            }else if (response.list === "Delete Employee") {
                removeEmp();
            
            } else if (response.list === "Delete Employee Role") {
                updateRole();
            
            } else if (response.list === "Update Employee Manager") {
                updateManager();
            
            } else if(response.list === "Exit") {
                connection.end();
                process.exit(0);
            }
            // Handles invalid input
            else {
                console.log("ERROR in choice try again ...");
                main();
            }
        })
}

// upon connection go to main function
// connection.connect(err => {
    // if (err) throw err;
    // main();
// })