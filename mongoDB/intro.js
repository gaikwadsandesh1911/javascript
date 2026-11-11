/* MongoDB?

        MongoDB is a NoSQL, document-oriented database that stores data in flexible JSON like format called BSON document. 
        
        Unlike relational databases, which store data in tables and rows, 
        MongoDB stores data in collections and documents.

   
    NoSQL?
       
       It refers to databases that don't rely on relational table-based model.
       common type of no-sql databases are:
          1. mongodb which is document based
          2. redis which is key:value pair 

    

    BSON?
       
       BSON stands for Binary JSON. It is the binary-encoded format MongoDB uses to store documents.
       
       JSON supports basic data types like strings, numbers, booleans, arrays and objects.

       BSON additionally supports types such as: 
       ObjectId, Date, Binary data, Decimal128
        
        

    Database

        A database is a container that holds one or more collections.

    
    Collection

        a collection is a group of related documents inside database, 
        it's similar to a table in SQL.
    
    
    Document

        its a individual record inside collection, 
        similar to row in SQL but capable of holding nested data as well.

        {
            "name": "Sandesh",
            "email": "sandesh@gmail.com"
        }

    Field
    
        It's a key-value pair inside a document.
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
        schema defines the structure of the data, including 
        fields, data types, and constraints.

        MongoDB is schema-flexible. 
        Documents within the same collection can have different fields or structures. 
        
        

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
        - JSON like documents - easy to work with js application.
        - Embedded documents  - allow related data to be stored in
        - Fast reads and writes
        - Horizontal scaling using sharding
        - Powerful querying


    Limitations of MongoDB

        - Document duplication can increase storage usage.
*/


/* _id

   every mongodb document has unique _id field, which act as primary identifier.
   mongodb automatically generate an ObjectId regarding _id field, when we do not provide it. 
    
   ObjectId

   It's BSON data types commonly used with _id field.
   It's 12 byte value contain information such as Timestamp, random value and counter.

*/



/* 
    Replication

        Replication copies data from a primary server to one or more secondary servers 
        to provide high availability and data redundancy.

    Sharding

        Sharding is MongoDB's horizontal scaling technique 
        where data is distributed across multiple servers called shards.

*/

/*  BSON Data Types

        String
        Number
        Boolean
        Array
        Object
        Date
        ObjectId
        Null
*/