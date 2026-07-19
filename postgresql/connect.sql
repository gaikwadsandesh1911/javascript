-- verify connection
postgres=# select version();

-- list available databases
postgres=# \l

-- create database
postgres=# create database myDatabase;

-- connect to database
postgres=# \c mydatabase;

-- you see connected database
mydatabase=#

-- delete database, you can't not delete database you connected, connect with other database first.
postgres=# drop database mydatabase;

-- clear screen
postgres=# \! cls