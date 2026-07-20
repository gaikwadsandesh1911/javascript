/*  DDL

        DDL (Data Definition Language) is used to define and modify: 
        the structure of database objects such as tables, schemas, indexes, and views. 
        
        DDL changes the database schema rather than the data itself.
*/


-- create database
create database ecommerce;

-- connect to database
\c ecommerce;

/* Database vs Schema

        Database is the top-level container, 
        while a schema is a folder inside a database.

        - inside Schema we group related table.

        - if no schema is created by default there is schema named 'public'
          inside all tables are created 


        PostgreSQL Server
        │
        ├── Database: company_db
        │   ├── Schema: public
        │   │   ├── employees
        │   │   ├── departments
        │   │   └── projects
        │   │
        │   ├── Schema: sales
        │   │   ├── customers
        │   │   └── orders
        │   │
        │   └── Schema: hr
        │       ├── employees
        │       └── payroll
        │
        └── Database: college_db
            └── Schema: public
                ├── students
                └── courses

 */

--  create schema
CREATE SCHEMA sales;

-- check current database
SELECT current_database();

-- check current schema
SELECT current_schema();

-- create table inside schema
CREATE TABLE sales.customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);


-- create table without schema. This table will be availble inside public schema.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE
);




-- alter => used to modify an existing database object.

-- add column
ALTER TABLE users ADD COLUMN age INT;

-- rename column
ALTER TABLE user RENAME COLUMN age TO user_age;

-- Change a column's data type
ALTER TABLE users ALTER COLUMN user_age TYPE BIGINT;

-- drop database
DROP DATABASE ecommerce;

-- drop table
DROP TABLE users;

-- TRUNCATE removes all rows from table but keep table structure.
TRUNCATE TABLE users;

-- rename table
ALTER TABLE users RENAME TO customers;


-- ----------------------------------------------------