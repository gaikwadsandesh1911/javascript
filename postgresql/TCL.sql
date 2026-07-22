/* TCL (Transaction Control Language).

        A transaction is a group of SQL operations that are executed together as one unit,
        all operations either succeed or fail.

        TCL controls transactions.


    Transactions are essential in:

        Banking systems (money transfers)
        E-commerce (placing an order, updating inventory, creating payment records)
        Airline ticket booking
        Hotel reservations
        Payroll systems


    The main TCL commands are:

        BEGIN       =>  START TRANSACTION

        COMMIT      =>  Permanently saves all changes made in the current transaction. 

        ROLLBACK    =>  Undoes all changes made in the current transaction if an error occurs or the transaction needs to be canceled.
        
        SAVEPOINT <savepoint_name>    =>    Creates a checkpoint within a transaction, allowing you to roll back to that specific point if needed.  
        
        ROLLBACK TO SAVEPOINT <savepoint_name>    =>      Creates a checkpoint within a transaction, allowing you to roll back to that specific point if needed.
 */

 CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    balance DECIMAL(10,2)
);

INSERT INTO accounts (name, balance)
VALUES
('Sandesh', 10000),
('Rahul', 5000);  

| id | name    | balance |
| -- | ------- | ------- |
| 1  | Sandesh | 10000   |
| 2  | Rahul   | 5000    |


-- -------------------------------------------------------------

-- start transition
 BEGIN;

-- deduct money from sandesh
UPDATE accounts
SET balance = balance - 2000
WHERE id = 1;

-- add money to rahul
UPDATE accounts
SET balance = balance + 2000
WHERE id = 2;

| name    | balance |
| ------- | ------- |
| Sandesh | 8000    |
| Rahul   | 7000    |

-- still the trasition is not permanant


COMMIT;
-- Now the transaction is saved permanently.

-- ----------------------------------------------------------

-- rollback eg.
BEGIN;

UPDATE accounts
SET balance = balance - 2000
WHERE id = 1;

-- Something goes wrong
ROLLBACK;


| name    | balance |
| ------- | ------- |
| Sandesh | 10000   |
| Rahul   | 5000    |

-- Everything returns to the original state.

-- -----------------------------------------------------------

-- savepoint eg.
BEGIN;

UPDATE accounts
SET balance = balance - 2000
WHERE id = 1;

SAVEPOINT after_deduction;

UPDATE accounts
SET balance = balance + 2000
WHERE id = 2;

ROLLBACK TO SAVEPOINT after_deduction;

UPDATE accounts
SET balance = balance + 1500
WHERE id = 2;

COMMIT;

-- -------------------------------------------------------



/* ACID

        ACID are a set of four properties that guarantee reliable and consistent database transactions. 
        
        It stands for:

            - Atomicity: 
                        Atomicity ensures that all operations within a transaction are treated as a single unit.
                        All or Nothing. Either all operation succeed or fail.

            - Consistency: 
                        Consistency ensures that database always remains correct and valid
                        before and after transaction.
            
            - Isolation:   
                        Isolation ensures that multiple transactions executing at the same time 
                        do not interfere with each other.
            
            - Durability:
                        Durability guarantees that once a transaction has been committed, 
                        its changes are permanently stored and 
                        will survive system failures such as crashes or power outages

 */