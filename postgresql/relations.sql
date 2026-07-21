/* Relationship

        A relationship is an association between two or more database tables 
        established using primary keys and foreign keys. 
        
        Relationships help organize related data and 
        maintain referential integrity.

*/



--  One-to-One Relationship (Employee → Passport)
-- Every employee has one passport. Every passport belongs to one employee.

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    employee_name VARCHAR(100)
);

CREATE TABLE passports (
    id SERIAL PRIMARY KEY,
    passport_number VARCHAR(20) UNIQUE,
    employee_id INT UNIQUE,

    FOREIGN KEY (employee_id) REFERENCES employees(id)
);


INSERT INTO employees(employee_name)
VALUES
('Sandesh'),
('Rahul');

| id | employee_name |
| -- | ------------- |
| 1  | Sandesh       |
| 2  | Rahul         |


INSERT INTO passports(passport_number,employee_id)
VALUES
('P12345',1),
('P67890',2);

| id | passport_number | employee_id |
| -- | --------------- | ----------- |
| 1  | P12345          | 1           |
| 2  | P67890          | 2           |


SELECT
e.employee_name,
p.passport_number
FROM employees e
INNER JOIN passports p
ON e.id=p.employee_id;

| Employee | Passport |
| -------- | -------- |
| Sandesh  | P12345   |
| Rahul    | P67890   |


-- -------------------------------------------------------------



-- One-to-Many Relationship (Department → Employees)
-- one department have many employees.

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    salary DECIMAL(10,2),
    department_id INT,

    FOREIGN KEY (department_id) REFERENCES departments(id)
);


INSERT INTO departments (department_name)
VALUES
('HR'),
('IT'),
('Finance');

| id | department_name |
| -- | --------------- |
| 1  | HR              |
| 2  | IT              |
| 3  | Finance         |


INSERT INTO employees(employee_name,salary,department_id)
VALUES
('Sandesh',50000,1),
('Rahul',70000,2),
('Priya',65000,2),
('Neha',55000,3);

| id | employee_name | salary | department_id |
| -- | ------------- | ------ | ------------- |
| 1  | Sandesh       | 50000  | 1             |
| 2  | Rahul         | 70000  | 2             |
| 3  | Priya         | 65000  | 2             |
| 4  | Neha          | 55000  | 3             |


SELECT
e.employee_name,
e.salary,
d.department_name
FROM employees e
INNER JOIN departments d
ON e.department_id=d.id;

| Employee | Salary | Department |
| -------- | ------ | ---------- |
| Sandesh  | 50000  | HR         |
| Rahul    | 70000  | IT         |
| Priya    | 65000  | IT         |
| Neha     | 55000  | Finance    |


-- -------------------------------------------------------------


-- Many-to-Many Relationship (Students ↔ Courses)
-- One student can enroll in many courses. One course can have many students.

/*  
    A many-to-many (M:N) relationship is a relationship where: 
        - one record in the first table can be associated with multiple records in the second table, and 
        - one record in the second table can also be associated with multiple records in the first table.

    Since relational databases cannot represent a many-to-many relationship directly, 
    it is implemented using a bridge (junction) table.

        A bridge table is an intermediate table 
        used to implement a many-to-many relationship.

        It stores the foreign keys of the two related tables, 
        and those foreign keys usually form a composite primary key 
        to ensure each relationship is unique.


 */

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    student_name VARCHAR(100)
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    course_name VARCHAR(100)
);

-- Bridge Table
CREATE TABLE enrollments (
    student_id INT,
    course_id INT,

    PRIMARY KEY(student_id,course_id), 
    -- composite primary key

    FOREIGN KEY(student_id) REFERENCES students(id),

    FOREIGN KEY(course_id) REFERENCES courses(id)
);


INSERT INTO students(student_name)
VALUES
('Sandesh'),
('Rahul');

| id | student_name |
| -- | ------------ |
| 1  | Sandesh      |
| 2  | Rahul        |


INSERT INTO courses(course_name)
VALUES
('PostgreSQL'),
('MongoDB');

| id | course_name |
| -- | ----------- |
| 1  | PostgreSQL  |
| 2  | MongoDB     |



INSERT INTO enrollments(student_id,course_id)
VALUES
(1,1),
(1,2),
(2,1);

| student_id | course_id |
| ---------- | --------- |
| 1          | 1         |
| 1          | 2         |
| 2          | 1         |


SELECT
s.student_name,
c.course_name
FROM enrollments e
INNER JOIN students s
ON e.student_id=s.id
INNER JOIN courses c
ON e.course_id=c.id;

 student_name | course_name
--------------+-------------
 Sandesh      | PostgreSQL
 Sandesh      | MongoDB
 Rahul        | PostgreSQL
