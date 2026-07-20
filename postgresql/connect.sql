-- SQL Shell (psql)

-- verify connection
postgres=# select version();

-- list available databases
\l

-- create database
create database myDatabase;

-- connect to database
\c mydatabase;

-- you see connected database
mydatabase=#

-- show currently connected database
SELECT current_database();

-- delete database. You can't delete database you are connected to, connect with other database first.
postgres=# drop database mydatabase;

-- clear screen
\! cls


-- show available table inside database
\dt
-- if no table availble you will see ... "Did not find any relations."

-- drop table
drop table tableName;