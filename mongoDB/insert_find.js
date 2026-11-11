// insert single document
db.employees.insertOne({
    name: "Rahul",
    age: 30,
    department: "HR",
    salary: 50000
})


// insert multiple doucements
db.employees.insertMany([
    {
        name: "Amit",
        age: 28,
        department: "Sales",
        salary: 45000
    },
    {
        name: "Neha",
        age: 26,
        department: "Engineering",
        salary: 90000
    },
    {
        name: "Priya",
        age: 32,
        department: "Finance",
        salary: 70000
    }
])


// -------------------------------

/* 
    find() 

        find() method returns all matching documents as a cursor. 
        
        cursor allow us to return documents in batches instead of loading all documents into memory once.

            - in native mongo driver cursor is converted into array.

            - with mongoose find() returns an array directly.


    findOne()

        returns the first matching document based on query filter. 
        If no document matches, it returns null.

*/

db.collection.find()
db.collection.find({})


// Query filter

// single condition
db.employees.find({
    name: "Sandesh"
})

// multiple conditions(AND)
db.employees.find({
    department: "Engineering",
    age: 25
})

// -------------------------------

/* 
    Projection
        Projection  means selecting only fields we want from document.
        It reduces unnecessory data returned from database.

        0 = hide
        1 = show

        -   by default _id is visible.

        -   we can not mix 0 and 1 except _id field.

*/
find(filter, projection)

// show only name and _id
db.employees.find(
    {},
    {
        name: 1
    }
)


//--------------------------------------------------

/*. sort(), limit(), skip()

       sort()  : sort documents in ascending or descending order.

       limit() : shows only specified number of documents.

       skip()  : skip first specified number of documents.

*/

// Ascending order
db.employees.find().sort({ age: 1 });

// Descending order
db.employees.find().sort({ age: -1 });

// limit
db.employees.find().limit(5);

// skip
db.employees.find().skip(5);


// pagination
const page = 2;
const limit = 10;

db.employees.find().skip((page - 1) * limit).limit(limit);
