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

        A database is an organized collection of related data that is stored and managed electronically. 
        so it can be easily accessed, updated, and retrieved.

    
    What is DBMS (Database Management System)?

        A DBMS is software that allows users to create, store, manage, retrieve, and manipulate data in a database. 
        It acts as an interface between the user/applications and the database.
    

    What is RDBMS (Relational Database Management System)?

        An RDBMS is a type of DBMS that stores data in the form of tables consisting of rows and columns. 
        It maintains relationships between tables using Primary Keys and Foreign Keys.

    
    What is PostgreSQL?

        PostgreSQL is an open-source relational database management system (RDBMS). 
        It stores data in tables and uses SQL(Structured Query Language) for querying.


    SQL (Structured Query Language):

        sql is standard language used to interact with relational databases. 
        It lets you create databases & tables And 
        store, retrieve, update, and delete data.

*/

/*  DBMS vs RDBMS:

        | DBMS                                        | RDBMS                                                     |
        | ------------------------------------------- | --------------------------------------------------------- |
        | Stores data in files or simple structures.  | Stores data in tables (rows and columns).                 |
        | May not support relationships between data. | Supports relationships using Primary Key and Foreign Key. |
        | Data redundancy is higher.                  | Data redundancy is minimized through normalization.       |
        | Limited support for data integrity.         | Provides strong data integrity using constraints.         |
        | Suitable for small applications.            | Suitable for large, enterprise-level applications.        |
        | May not fully support SQL.                  | Uses SQL as the standard language.                        |

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


/*  Commonly Used Data Types in PostgreSQL:

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

    - Constraints are rules applied to a table's columns 
      to ensure that only valid and accurate data is stored in the database.

    - They help maintain data integrity by preventing invalid data from being inserted, updated, or deleted.


        | Constraint    | Purpose                                      |
        | ------------- | -------------------------------------------- |
        | `NOT NULL`    | Prevents a column from storing `NULL` values |
        | `UNIQUE`      | Prevents duplicate value                     |
        | `PRIMARY KEY` | Uniquely identifies each row                 |
        | `FOREIGN KEY` | Maintains relationships between tables       |
        | `CHECK`       | Ensures values meet a specified condition    |
        | `DEFAULT`     | Assigns a default value if none is provided  |

*/

/*  Primary Key

        A Primary Key is a column that uniquely identifies each row in a table. 
        A primary key cannot contain NULL values, and each value must be unique.

    Foreign Key

        A Foreign Key is a column in one table that references the primary key of another table. 
        It is used to establish relationships between tables.


        | Primary Key               | Foreign Key                                        |
        | ------------------------- | -------------------------------------------------- |
        | Uniquely identifies a row | References a primary key in another table          |
        | Must be unique            | Can have duplicate values                          |
        | Cannot be `NULL`          | Can be `NULL` (unless constrained with `NOT NULL`) |
        | One primary key per table | A table can have multiple foreign keys             |
        | Ensures entity identity   | Establishes relationships between tables           |

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

        Operators are special symbols or keywords that perform operations on 
        one or more values (operands) and return a result.


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
