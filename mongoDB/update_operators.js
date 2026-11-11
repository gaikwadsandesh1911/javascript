/* Update operators

    Update operators are used to modify specified field of document 
    without replacing the entire document. 

    They are used with updateOne(), updateMany() methods


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
        query filter,
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

    // $min updates a field if new value is smaller than existing

    // $max updates a field if the new value is greater than existing

    db.employees.updateOne(
        { name: "Sandesh" },
        {
            $min: {
                salary: 70000
            }
        }
    )

    
    // ------------------------------------------------------

    // rename used to rename field 
    db.collection.updateMany(
      {},
      {
        $rename: {
         "oldFieldName": "newFieldName"
        }
      }
    )

   //-----------------------------------------------

    // mul
    db.products.updateOne(
      { name: "Laptop" },
      {
        $mul: {
         price: 2
        }
      }
    )

    //------------------------------------------------------

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
        },
        {

            name: "Sandesh",
            skills: ["JavaScript", "React", "Node.js"],
            marks: [70, 80, 90]
        },

        {
            name: "Rahul",
            skills: ["Java", "Python"],
            marks: [60, 75]
    ]);


    // -------------------------------------------------


    // $push - Add an element to existing array field
    db.students.updateOne(
        { name: "Alice" },
        {
            $push: {
                subjects: "Computer Science"
            }
        }
    );
    
    
    // $each  add multiple elements to array fields
 db.students.updateOne(
  { name: "Sandesh" },
  {
    $push: {
      skills: {
        $each: ["Express", "Next.js"]
      }
    }
  }
)

  // -----------------------------------------------

    // $addToSet - Add only if not present, so no duplicate is added.

db.students.updateOne(
  { name: "Sandesh" },
  {
    $addToSet: {
      skills: "React"
    }
  }
)

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

/*
    updateOne() modifies only the specified fields when using update operators.
    replaceOne() replaces the entire document except its _id.

*/
db.employees.replaceOne(
  { name: "Sandesh" },
  { name: "Sandesh", age: 26 }
);
