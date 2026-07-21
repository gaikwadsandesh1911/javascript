/* DML (Data Manipulation Language).

        DML is used to manipulate the data stored in database tables. 
        
        - Unlike DDL, DML does not change the table structure, 
          DML only works with the records (rows).

    DML operations are:
            - insert
            - update
            - delete

    **
    Traditionally, SELECT belongs to DQL (Data Query Language) because it only retrieves data and does not modify it

 */

        -- create table (DDL)
        CREATE TABLE users (
           id SERIAL PRIMARY KEY,
           name TEXT NOT NULL,
           email TEXT UNIQUE
        );


        -- insert
        INSERT INTO users (name, email)
        VALUES ('Sandesh', 'sandesh@gmail.com');


        -- update
        UPDATE users
        SET email = 'new@gmail.com'
        WHERE id = 1;

        -- delete
        DELETE FROM users
        WHERE id = 1;

        -- without where clause delete removes all record
        DELETE FROM users;