/* Update operators

    Update operators in MongoDB are special operators (prefixed with $) 
    used to modify specific fields of existing documents 
    without replacing the entire document. 
        
    They are used with update methods such as 
    updateOne(), updateMany() etc.


    ├── updateOne()
    ├── updateMany()
    ├── replaceOne()
    ├── Update Operators
    │     ├── $set
    │     ├── $unset
    │     ├── $inc
    │     ├── $mul
    │     ├── $rename
    │     ├── $currentDate
    │     ├── $min
    │     ├── $max
    │     └── $setOnInsert
    └── Array Update Operators
        ├── $push
        ├── $pull
        ├── $pullAll
        ├── $addToSet
        ├── $pop
        ├── $each
        ├── $position
        └── $slice 
      
*/
    // syntax
    db.collection.updateOne(
        filter,
        {
            updateOperator: {
                field: value
            }
        }
    )


// -------------------------------------------------

/* $set

    Updates the value of an existing field or 
    creates the field if it does not already exist.
*/

    db.employees.updateOne(
            { name: "Sandesh" },
            {
                $set: {
                    salary: 90000
                }
            }
    )

    // if city not already presents it creates it.
     db.employees.updateOne(
        { name: "Sandesh" },
        {
            $set: {
                city: "Pune"
            }
        }
    )

    // ------------------------------------------------------

    // $unset:       removes a field itself from a document.
    db.employees.updateOne(
        { name: "Sandesh" },
        {
            $unset: {
                city: ""
            }
        }
    )

    // ------------------------------------------------------

    // $inc         increments or decrements the value of a numeric field.
    
    db.employees.updateOne(
        { name: "Sandesh" },
        {
            $inc: {
                salary: 5000
            }
        }
    )

    // decrement.
    db.employees.updateOne(
        { name: "Sandesh" },
        {
            $inc: {
                salary: -2000
            }
        }
    )

    // ------------------------------------------------------

    // $min updates a field only if the specified value is smaller than the current value.

    // $max updates a field only if the specified value is greater than the current value.

    db.employees.updateOne(
        { name: "Sandesh" },
        {
            $min: {
                salary: 70000
            }
        }
    )
    // If current value (salary) is greater than 70000 then only works

    
    // ------------------------------------------------------


    // update multiple fields
    db.employees.updateOne(
        { name: "Sandesh" },
        {
            $set: {
                department: "Engineering"
            },
            $inc: {
                salary: 5000
            },
            $currentDate: {
                updatedAt: true
            }
        }
    )


    // ------------------------------------------------------


    // Array Update Operators

    db.students.insertMany([
        {
            name: "Alice",
            subjects: ["Math", "Physics"],
            marks: [80, 90]
        },
        {
            name: "Bob",
            subjects: ["Chemistry"],
            marks: [75]
        }
    ]);


    // -------------------------------------------------


    // $push - Add an element
    db.students.updateOne(
        { name: "Alice" },
        {
            $push: {
                subjects: "Computer Science"
            }
        }
    );

// -----------------------------------------------

    // $addToSet - Add only if not present, so no duplicate is added.

    // $addToSet with $each - To add multiple unique values:
    db.students.updateOne(
        { name: "Alice" },
        {
            $addToSet: {
                subjects: {
                $each: ["Java", "Physics", "Python"]
            }
            }
        }
    );

    // -----------------------------------------------

    // $pull - Remove matching values
    db.students.updateOne(
        { name: "Alice" },
        {
            $pull: {
                subjects: "Physics"
            }
        }
    );

    // -----------------------------------------------


    // $pop - Remove first or last element
    db.students.updateOne(
        { name: "Charlie" },
        {
            $pop: {
            subjects: 1
            }
        }
    );
    //  1    first element
    // -1    last element

    // -----------------------------------------------
