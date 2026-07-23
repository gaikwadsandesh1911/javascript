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

        find() method returns cursor that points to matching document, 
        not actual document directly.
        
            - It provide access to query result and
            - allow documents to be retrieved efficiently in batches
                instead of loading all result into memory at once. 
        

        Cursor: A cursor is an object return by find() method. 
                that allows you to iterate over the query results 
                without loading all documents into memory at once.

                - in native mongo driver cursor is converted into array.

                - with mongoose find() returns an array directly.


    findOne()

        returns the first document that matches the specified filter. 
        If no document matches, it returns null.

*/
db.collection.find()
db.collection.find({})


// -------------------------------

// Query filter
db.collection.find({
    field: value
})

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
        Projection controls which fields are returned.
        
        _id: 0,
        name: 1,
        salary: 1

        0 => exclusion = hide
        1 => inclusion = show

        -   by default _id is visible.

        -   we can not mix inclusion and exclusion expect _id field.

*/
find(filter, projection)

// show only name and _id
db.employees.find(
    {},
    {
        name: 1
    }
)