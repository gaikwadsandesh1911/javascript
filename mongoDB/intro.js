/* MongoDB?

        MongoDB is a NoSQL, document-oriented database 
        that stores data in BSON documents instead of row and column. 
        
        It provides a flexible schema, high performance, and horizontal scalability, 
        making it suitable for handling large volumes of structured, semi-structured, and unstructured data.


    NoSQL?

        NoSQL stands for "Not Only SQL."

        It refers to databases that do not rely solely on relational tables. 
        They can store data as documents in a BSON ( JSON-like object containing key-value pairs ).


    BSON?

        BSON (Binary JSON) is MongoDB's binary-encoded format for storing documents. 
        
        It extends JSON by supporting additional data types such as 
        ObjectId, Date, Binary, Decimal128, and more. 
        
        BSON is optimized for efficient storage and faster data traversal.
        

    Database
        A database is a container that holds one or more collections.

    
    Collection
        a collection is a group of related documents, 
        similar to a table in SQL.
            - Users
            - Products
    
    Document
        a single record stored as a BSON object containing key-value pairs,
        similar to row in SQL.

        {
            "name": "Sandesh",
            "email": "sandesh@gmail.com"
        }

    Field
        A field is a key-value pair inside a document.
        similar to column in SQL.

        name : "Sandesh"


    | SQL          | MongoDB                           |
    | ------------ | --------------------------------- |
    | Database     | Database                          |
    | Table        | Collection                        |
    | Row          | Document                          |
    | Column       | Field                             |
    | Primary Key  | `_id`                             |
    | JOIN         | Embedding / Reference / `$lookup` |
    | Fixed Schema | Flexible Schema                   |


    Schema?
        schema defines the structure of the data, including fields, data types, and constraints.

        MongoDB is schema-flexible. 
        Documents within the same collection can have different fields and structures. 
        
        

        // document 1:
        {
            "name":"Sandesh",
            "age":25
        }

        // document 2:
        {
            "name":"Rahul",
            "city":"Pune",
            "salary":50000
        }


        *** However, schema validation can be applied if needed.



    Advantages of MongoDB?

        - Flexible schema
        - Easy to store nested data
        - Fast reads and writes
        - Horizontal scaling using sharding


    Limitations of MongoDB

        - Document duplication can increase storage usage.
*/



/* 
    Replication

        Replication copies data from a primary server to one or more secondary servers 
        to provide high availability and data redundancy.

    Sharding

        Sharding is MongoDB's horizontal scaling technique 
        where data is distributed across multiple servers called shards.

*/