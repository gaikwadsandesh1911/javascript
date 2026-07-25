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

db.employees.insertMany([
  {
    name: "Sandesh",
    age: 25,
    department: "Engineering",
    salary: 80000,
    skills: ["JavaScript", "React", "MongoDB"],
    subjects: [
      {
        subject: "Math",
        marks: 65
      },
      {
        subject: "Science",
        marks: 70
      }
    ]
  },
  {
    name: "Rahul",
    age: 30,
    department: "HR",
    salary: 50000,
    skills: ["Java", "Spring"],
    subjects: [
      {
        subject: "Math",
        marks: 80
      },
      {
        subject: "Science",
        marks: 95
      }
    ]
  },
  {
    name: "Priya",
    age: 32,
    department: "Finance",
    salary: 70000,
    skills: ["JavaScript", "Node.js"],
    subjects: [
      {
        subject: "Math",
        marks: 90
      },
      {
        subject: "Science",
        marks: 85
      }
    ]
  }
]);


/* Comparison Operators:
        compare the value of a field with a specified value 
        and return documents that satisfy the comparison condition.
*/

// $eq 
db.employees.find({
    department: {
        $eq: "Engineering"
    }
})


// $ne
db.employees.find({
    department: {
        $ne: "Engineering"
    }
})

// $in      =>      returns documents where the field value matches any one of the values in the specified array.
db.employees.find({
    department: {
        $in: ["Engineering", "Finance"]
    }
})

// combine multiple
db.employees.find({
    age: {
        $gte: 25,
        $lte: 30
    }
})

// ---------------------------------------------

/* Logical Operators:
        combine one or more query conditions and 
        return documents based on logical operations such as AND, OR, NOT, and NOR
*/

// syntax
db.collection.find({
    $and: [
        { condition1 },
        { condition2 }
    ]
})


// $and     =>      returns documents only if all specified conditions are true.
db.employees.find({
    $and: [
        { department: "Engineering" },
        { salary: { $gt: 85000 } }
    ]
});

// $not     =>      returns documents that do not satisfy the specified condition.
db.employees.find({
    salary: {
        $not: {
            $gt: 80000
        }
    }
})

// ------------------------------------------------

/* 
    | Comparison                   | Logical                       |
    | ---------------------------- | ----------------------------- |
    | Compare a field with a value | Combine multiple conditions   |
    | `$gt`, `$lt`, `$eq`, `$in`   | `$and`, `$or`, `$not`, `$nor` |
    |                              |                               |
    | Used inside a field          | Used at the query level       |

*/

// ------------------------------------------------------


/* Array Operators:
        are used to query documents based on the contents, size, or matching elements of an array field.
*/
// syntax
db.collection.find({
    field: {
        $all: [value1, value2]
    }
})

// $all     =>  returns documents where an array contains all of the specified values.
db.students.find({
    skills: {
        $all: ["JavaScript", "MongoDB"]
    }
})

// $elemMatch   =>  returns documents where at least one element in an array satisfies all the specified conditions.
db.students.find({
    subjects: {
        $elemMatch: {
            subject: "Science",
            marks: {
                $gt: 90
            }
        }
    }
})
/*  $elemMatch ensures the same array element satisfies all conditions.

    without $elemMatch  MongoDB checks these conditions independently.

    db.students.find({
        "subjects.subject": "Science",
        "subjects.marks": {
            $gt: 90
        }
    })

    so,
        -   One array element could satisfy "Science"
        -   Another array element could satisfy marks > 90


    $elemMatch ensures the same array element satisfies all conditions.

*/


// ------------------------------------------------------


/* Element Operators:
        Element operators query documents based on whether a field ( not value) exists or not
        
*/
// employees where the age field exists.
db.employees.find({
    age: {
        $exists: true
    }
})

// employees where age is an integer.
db.employees.find({
    age: {
        $type: "int"
    }
})


/* Evaluation Operators
        Evaluation operators evaluate field values using expressions, 
        regular expressions, text search, or mathematical conditions.
*/

//  $regex      =>      returns documents where a string field matches a specified regular expression (pattern).
db.collection.find({
    field: {
        $regex: "pattern"
    }
})

// $text    =>  performs full-text search on fields that have a text index.
db.employees.createIndex({
    department: "text"
})

db.employees.find({
    $text: {
        $search: "Engineering"
    }
})