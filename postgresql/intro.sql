/* 
    What is Data?

        Data is a collection of raw facts or values that by themselves may not have much meaning.
        It can be numbers, text, dates, images etc.
        It's raw fact and meaningless so you can not make decison out of it.

        eg.
            Sandesh
            Mumbai


    What is Information?

        Information is processed, organized, or interpreted data that provides meaning.
        Since, the data has context and meaning so, it can be used for decision-making.

        eg.
            name: sandesh
            city: mumbai

    
    What is a Database?

        A database is an organized collection of related data that is stored and managed electronically  
        so it can be easily accessed, updated, and retrieved.

    
    What is PostgreSQL?

        PostgreSQL is an open-source relational database management system (RDBMS). 
        It stores data in tables and uses SQL(Structured Query Language) for querying.


    SQL (Structured Query Language):

        sql is standard language used to interact with relational databases. 
        It lets you create databases & tables And 
        store, retrieve, update, and delete data.

*/



/*  SQL operations are broadly classified into these categories:

        | Category                               | Purpose                               | Commands                                   |
        | -------------------------------------- | ------------------------------------- | ------------------------------------------ |
        | DDL (Data Definition Language)         | Defines or changes database structure | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`      |
        | DML (Data Manipulation Language)       | Manipulates the data stored in tables | `INSERT`, `UPDATE`, `DELETE`               |
        | DQL (Data Query Language)              | Retrieves data                        | `SELECT`                                   |
        | DCL (Data Control Language)            | Controls permissions                  | `GRANT`, `REVOKE`                          |
        | TCL (Transaction Control Language)     | Manages transactions                  | `BEGIN`, `COMMIT`, `ROLLBACK`, `SAVEPOINT` |

*/

-- ----------------------------------------------------------------------------


/*  Commonly Used Data Types in Real Projects:

        | Data Type              | Typical Use                       |
        | ---------------------- | --------------------------------- |
        | `SERIAL` / `BIGSERIAL` | Primary keys                      |
        | `INT`                  | Age, quantity, counts             |
        | `VARCHAR(n)`           | Names, email addresses            |
        | `TEXT`                 | Long descriptions or comments     |
        | `BOOLEAN`              | Active/inactive flags             |
        | `DATE`                 | Birth dates, order dates          |
        | `TIMESTAMP`            | Creation and update timestamps    |
        | `DECIMAL(10,2)`        | Prices and monetary values        |
        | `JSONB`                | Flexible application data         |
        | `UUID`                 | Unique identifiers across systems |

*/

-- --------------------------------------------------------------------------

/*  Common Constraints in PostgreSQL: 

        | Constraint    | Purpose                                      |
        | ------------- | -------------------------------------------- |
        | `NOT NULL`    | Prevents a column from storing `NULL` values |
        | `UNIQUE`      | Prevents duplicate value                     |
        | `PRIMARY KEY` | Uniquely identifies each row                 |
        | `FOREIGN KEY` | Maintains relationships between tables       |
        | `CHECK`       | Ensures values meet a specified condition    |
        | `DEFAULT`     | Assigns a default value if none is provided  |

*/

-- check
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    age INT CHECK (age >= 18)
);

-- default
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    status VARCHAR(20) DEFAULT 'Active'
);;


-- foreign key: creates relationship between two tables.
CREATE TABLE departments (
    dept_id SERIAL PRIMARY KEY,
    dept_name VARCHAR(50)
);

CREATE TABLE employees (
    emp_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    dept_id INT,
    FOREIGN KEY (dept_id)
        REFERENCES departments(dept_id)
);
-- Here, dept_id in employees must exist in departments.


-- ----------------------------------------------------------


/*  operators

| Category            | Operators                                   | 
| ------------------- | ------------------------------------------- |
| Arithmetic          | `+`, `-`, `*`, `/`, `%`, `^`                |                        
| Comparison          | `=`, `!=`, `<>`, `>`, `<`, `>=`, `<=`       |                        
| Logical             | `AND`, `OR`, `NOT`                          |                         
| Pattern Matching    | `LIKE`, `ILIKE`, `NOT LIKE`                 |                       
| Membership          | `IN`, `NOT IN`                              |            
| Range               | `BETWEEN`, `NOT BETWEEN`                    |                         
| NULL Check          | `IS NULL`, `IS NOT NULL`                    |                         
| Subquery Comparison | `ANY`, `ALL`                                |                         
| String              | `                                           |                        
| Bitwise             | `&`, `                                      |
| JSON                | `->`, `->>`, `#>`, `#>>`                    |                         
| Array               | `@>`, `<@`, `&&`                            |
| Set                 | `UNION`, `UNION ALL`, `INTERSECT`, `EXCEPT` |

| ORDER BY            | 'ASC', 'DESC'                               |
| LIMIT               |  Limit the number of rows returned.         |                                      |
| OFFSET              |  Skip a specified number of rows            |
| DISTINCT            |  Return unique values.                      |
| GROUP BY            |  Group rows before applying aggregate functions.
| HAVING              |  Filter grouped results.

 */



-- Logical =>  AND, OR,  NOT

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

