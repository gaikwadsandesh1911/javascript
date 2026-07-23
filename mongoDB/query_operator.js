/* Query Operators

    "Query operators in MongoDB are special operators (prefixed with $) 
        used to specify conditions and filter/search documents during query operations 
        such as find(), findOne(), update(), and delete(). 
    
    They allow you to perform comparisons, logical operations, array matching, pattern matching, and other advanced queries."


    ├── Comparison
    │   ├── $eq
    │   ├── $ne
    │   ├── $gt
    │   ├── $gte
    │   ├── $lt
    │   ├── $lte
    │   ├── $in
    │   └── $nin
    │
    ├── Logical
    │   ├── $and
    │   ├── $or
    │   ├── $not
    │   └── $nor
    │
    ├── Element
    │   ├── $exists
    │   └── $type
    │
    ├── Array
    │   ├── $all
    │   ├── $size
    │   └── $elemMatch
    │
    └── Evaluation
        ├── $regex
        ├── $expr
        ├── $mod
        ├── $text
        └── $where (Rare)

*/

/* Comparison Operators

*/


/* Logical Operators

*/


/* 
    | Comparison                   | Logical                       |
    | ---------------------------- | ----------------------------- |
    | Compare a field with a value | Combine multiple conditions   |
    | `$gt`, `$lt`, `$eq`, `$in`   | `$and`, `$or`, `$not`, `$nor` |
    |                              |                               |
    | Used inside a field          | Used at the query level       |

*/


/* Array Operators

*/


/* Element Operators

*/


/* Evaluation Operators

*/