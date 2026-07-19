/*  DDL

        DDL (Data Definition Language) is used to define and modify : 
        the structure of database objects such as tables, schemas, indexes, and views. 
        
        DDL changes the database schema rather than the data itself.
*/



postgres=# create database ecommerce;

postgres=# \c ecommerce;


-- create table <tablename>  used to create table.
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