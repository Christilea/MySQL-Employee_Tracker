# MySQLEmployeeTracker
Employee Tracker App
# User Story

As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
##  Table of Contetents
* Installation
* Usage
* License
## Instructions

Design the following database schema containing three tables:

![Database Schema](Assets/schema.png)

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
  
Build a command-line application that at a minimum allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

Bonus points if you're able to:

  * Update employee managers

  * View employees by manager

  * Delete departments, roles, and employees

  * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

![Employee Tracker](Assets/employee-tracker.gif)

### Usage

* The command-line application should allow users to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

## Installation
This application requires Node.js JavaScript Runtime, Inquirer.js and MySQL packages. Basic knowledge of Node.js, Inquirer.js, and MySQL.js is recommended to run the application. To faciliate the installation and run of the application, a package.json file is provided with the project along with basic instructions of how to install the required libraries:
npm i inquirer
npm i mysql
schema.sql
seed.sql

Watch a video walkthrough here

## 
