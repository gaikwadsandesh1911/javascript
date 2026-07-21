/* JOIN

        Join's are used to combine rows from two or more tables based on a related column, 
        usually a Primary Key and a Foreign Key.

 */

-- Departments
 CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

INSERT INTO departments (department_name)
VALUES
        ('HR'),
        ('IT'),
        ('Finance');
        ('Marketing');

| id | department_name |
| -- | --------------- |
| 1  | HR              |
| 2  | IT              |
| 3  | Finance         |
| 4  | Marketing       |




-- employees
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

INSERT INTO employees (name, department_id)
VALUES
        ('Sandesh', 1),
        ('Rahul', 2),
        ('Priya', 2),
        ('Neha', NULL);

| id | name    | department_id |
| -- | ------- | ------------- |
| 1  | Sandesh | 1             |
| 2  | Rahul   | 2             |
| 3  | Priya   | 2             |
| 4  | Neha    | NULL          |

✅ HR has one employee
✅ IT has two employees
✅ Finance has no employee
✅ Marketing has no employee
✅ Neha has no department

-- --------------------------------------------------------


-- INNER JOIN   =>    Returns only matching records.
SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d
ON e.department_id = d.id;

| name    | department_name |
| ------- | --------------- |
| Sandesh | HR              |
| Rahul   | IT              |
| Priya   | IT              |


-- LEFT JOIN    =>       selects ALL records from the "left" table, and only matching records from the "right" table.
SELECT e.name, d.department_name
FROM employees e
LEFT JOIN departments d
ON e.department_id = d.id;

| name    | department_name |
| ------- | --------------- |
| Sandesh | HR              |
| Rahul   | IT              |
| Priya   | IT              |
| Neha    | NULL            |

-- RIGHT JOIN   =>       selects ALL records from the "right" table, and the matching records from the "left" table.
SELECT e.name, d.department_name
FROM employees e
RIGHT JOIN departments d
ON e.department_id = d.id;

| name    | department_name |
| ------- | --------------- |
| Sandesh | HR              |
| Rahul   | IT              |
| Priya   | IT              |
| NULL    | Finance         |
| NULL    | Marketing       |


-- FULL OUTER JOIN      =>      selects ALL records from both tables, even if there is not a match.
SELECT e.name, d.department_name
FROM employees e
FULL OUTER JOIN departments d
ON e.department_id = d.id;

| name    | department_name |
| ------- | --------------- |
| Sandesh | HR              |
| Rahul   | IT              |
| Priya   | IT              |
| Neha    | NULL            |
| NULL    | Finance         |
| NULL    | Marketing       |

