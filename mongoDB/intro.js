/* MongoDB?

        MongoDB is a NoSQL, document-oriented database
        instead of traditional rows and columns it stores data in JSON like format called BSON. 
        
        it supports flexible schema, indexing, aggregation, replication and horizontal scaling.

   
    NoSQL?
       
       NoSQL means non-relational database designed to store and manage data in document format.
       such as key-value pairs instead of traditional rows and columns.

    

    BSON?

        BSON (Binary JSON) is MongoDB's binary-encoded format for storing documents. 
        
        It extends JSON by supporting additional data types such as 
        ObjectId, Date, Binary, Decimal128, and more. 
        
        BSON is optimized for efficient storage and faster data traversal.
        

    Database

        A database is a container that holds one or more collections.

    
    Collection

        a collection is a group of related documents inside database, 
        it's similar to a table in SQL.
    
    
    Document

        a single record , similar to row in SQL but capable of holding nested data as well.

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

   every document has unique _id field. 
   mongodb automatically generate an ObjectId regarding _id field, when we do not provide it. 
    
   an ObjectId is 12 byte identifier, commonly used to identify document.

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