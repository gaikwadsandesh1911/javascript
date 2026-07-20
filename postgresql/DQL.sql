/* DQL (Data Query Language).


        DQL is used to retrieve or query data from a database. 
        The primary DQL command is SELECT, which allows us to fetch data from one or more tables.

 */
 

--  Retrieve all columns.
SELECT * FROM users;


-- Retrieve specific columns
SELECT name, email
FROM users;


-- WHERE Clause:  Filter rows based on a condition.
SELECT *
FROM users
WHERE age > 18;


-- ORDER BY Clause: Sort the result.
SELECT *
FROM users
ORDER BY age ASC;


SELECT *
FROM users
ORDER BY age DESC;


-- LIMIT:   Limit the number of rows returned.
SELECT *
FROM users
LIMIT 5;


-- OFFSET:  Skip a specified number of rows.
SELECT *
FROM users
LIMIT 5 OFFSET 10;
-- useful for pagination.


-- DISTINCT:  Return unique values.
SELECT DISTINCT city
FROM users;

-- ----------------------------------------------------

-- Logical Operators =>  AND, OR,  NOT

--  AND:    Returns TRUE only if both conditions are true.
SELECT *
FROM employees
WHERE department = 'IT'
    AND salary > 50000;
-- Result: Returns employees who are in the IT department and have a salary greater than 60,000.

-- OR:      Returns TRUE if at least one condition is true.
SELECT *
FROM employees
WHERE department = 'IT'
   OR department = 'HR';
-- Result: Returns employees who belong to either the IT or HR department

-- NOT:     Reverses a boolean condition
SELECT *
FROM employees
WHERE NOT department = 'IT';
-- Result: Returns employees who are not in the IT department.

-- combine
SELECT *
FROM employees
WHERE (department = 'IT' OR department = 'HR')
  AND salary > 60000;


-- -----------------------------------------------

/*  Pattern Matching Operators:     used to search text

        | Operator   | Description                    |
        | ---------- | ------------------------------ |
        | `LIKE`     | Case-sensitive pattern match   |
        | `ILIKE`    | Case-insensitive pattern match |
        | `NOT LIKE` | Opposite of `LIKE`             |

 */

SELECT *
FROM employees
WHERE name LIKE 'A%';

| Pattern | Meaning                                       | Example Matches    |
| ------- | --------------------------------------------- | ------------------ |
| `'A%'`  | Starts with `A`                               | Amit, Alice        |
| `'%A'`  | Ends with `A`                                 | Sita, Anna         |
| `'%A%'` | Contains `A` anywhere                         | Ramesh, Aman, Zara |
| `'A__'` | Starts with `A` and has exactly 3 characters  | Ash, Ann           |
| `'A_%'` | Starts with `A` and has at least 2 characters | Amit, Alex         |


-- -----------------------------------------------------------------


/* membership operators:    to check value exist or  not in list

        | Operator | Description                                                |
        | -------- | ---------------------------------------------------------- |
        | `IN`     | Checks if a value exists in a list or subquery             |
        | `NOT IN` | Checks if a value does **not** exist in a list or subquery |

 */


-- IN      returns TRUE if the value matches any value in the list.
SELECT *
FROM employees
WHERE department IN ('IT', 'HR');

-- this is equivalent to

SELECT *
FROM employees
WHERE department = 'IT'
   OR department = 'HR';


-- NOT IN    returns TRUE if the value is not present in the list.
SELECT *
FROM employees
WHERE department NOT IN ('IT', 'HR');


-- -------------------------------------------------------------

/* Range operators

        | Operator      | Description                                                                    |
        | ------------- | ------------------------------------------------------------------------------ |
        | `BETWEEN`     | Checks if a value falls within a specified range (inclusive of both endpoints) |
        | `NOT BETWEEN` | Checks if a value falls outside a specified range                              |

 */

-- BETWEEN
SELECT *
FROM employees
WHERE salary BETWEEN 30000 AND 60000;

--  this is equivalent to

WHERE age >= 18 AND age <= 30;


-- NOT BETWEEN   ( Values outside the range )
SELECT *
FROM employees
WHERE age NOT BETWEEN 18 AND 30;

--  this is equivalent to

WHERE age < 18 OR age > 30;

-- ----------------------------------------------------


/*  Aggregate Functions, GROUP BY, HAVING

        Aggregate functions are functions that perform a calculation on multiple rows of data and 
        return a single result.

            COUNT()
            SUM()
            AVG()
            MIN()
            MAX()


        GROUP BY:
                - Aggregate functions are often used with the GROUP BY clause to calculate results for each group.

                - GROUP BY clause groups rows that have the same values into summary rows.
        HAVING:
                -  The HAVING clause filters groups after aggregation.

                - The HAVING clause was added to SQL because the WHERE clause cannot be used with aggregate functions.

                - Aggregate functions are often used with GROUP BY clauses, 
                  and by adding HAVING we can write condition like we do with WHERE clauses.
 */

        -- Count employees with a salary greater than 50,000:
        SELECT COUNT(*)
        FROM employees
        WHERE salary > 50000;

        SELECT SUM(salary)
        FROM employees;


        -- employee table

        | name    | department | salary |
        | ------- | ---------- | ------ |
        | Sandesh | IT         | 50000  |
        | Rahul   | HR         | 60000  |
        | Amit    | IT         | 55000  |
        | Priya   | HR         | 65000  |


        SELECT department,
            AVG(salary)
        FROM employees
        GROUP BY department;

        -- output

        | department | avg   |
        | ---------- | ----- |
        | IT         | 52500 |
        | HR         | 62500 |


        SELECT department,
            COUNT(*)
        FROM employees
        GROUP BY department
        HAVING COUNT(*) > 1;

-- ----------------------------------------------------