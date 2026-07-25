/* Aggregation Framework

        The Aggregation Framework in MongoDB is a data processing framework 
        that transforms and analyzes documents through 
        a sequence of stages called a pipeline. 
        where output of one stage becomes input to next stage.

        It is used to perform operations such as filtering, grouping, sorting, projecting, joining, and 
        calculating aggregated results."

        Different stages
        │
        ├── $match
        ├── $project
        ├── $group
        ├── $sort
        ├── $limit
        ├── $skip
        ├── $unwind
        ├── $lookup
        ├── $count
        └── $addFields / $set


| Expression Operators                                                | Accumulator Operators                                                              |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Work on **one document at a time**                                  | Work on **multiple documents**                                                     |
| Examples: `$multiply`, `$add`, `$concat`, `$cond`, `$year`          | Examples: `$sum`, `$avg`, `$min`, `$max`, `$push`, `$addToSet`                     |
| Used in `$project`, `$addFields`, `$match` (with `$expr`), `$group` | Primarily used in `$group` (and also `$bucket`, `$bucketAuto`, `$setWindowFields`) |


*/
db.orders.insertMany([
{
    _id: 1,
    orderNo: "ORD1001",
    customer: "Rahul",
    city: "Pune",
    status: "Delivered",
    payment: "UPI",
    totalAmount: 2500,
    items: [
        {
            product: "Laptop Bag",
            category: "Accessories",
            quantity: 1,
            price: 1500
        },
        {
            product: "Mouse",
            category: "Electronics",
            quantity: 2,
            price: 500
        }
    ]
},
{
    _id: 2,
    orderNo: "ORD1002",
    customer: "Sneha",
    city: "Mumbai",
    status: "Pending",
    payment: "Card",
    totalAmount: 4200,
    items: [
        {
            product: "Keyboard",
            category: "Electronics",
            quantity: 2,
            price: 1200
        },
        {
            product: "USB Hub",
            category: "Accessories",
            quantity: 1,
            price: 1800
        }
    ]
},
{
    _id: 3,
    orderNo: "ORD1003",
    customer: "Amit",
    city: "Delhi",
    status: "Delivered",
    payment: "Cash",
    totalAmount: 1800,
    items: [
        {
            product: "Headphones",
            category: "Electronics",
            quantity: 1,
            price: 1800
        }
    ]
},
{
    _id: 4,
    orderNo: "ORD1004",
    customer: "Priya",
    city: "Pune",
    status: "Cancelled",
    payment: "UPI",
    totalAmount: 3500,
    items: [
        {
            product: "Monitor",
            category: "Electronics",
            quantity: 1,
            price: 3500
        }
    ]
},
{
    _id: 5,
    orderNo: "ORD1005",
    customer: "Karan",
    city: "Bangalore",
    status: "Delivered",
    payment: "Card",
    totalAmount: 5200,
    items: [
        {
            product: "SSD",
            category: "Electronics",
            quantity: 2,
            price: 2000
        },
        {
            product: "HDMI Cable",
            category: "Accessories",
            quantity: 2,
            price: 600
        }
    ]
}
]);

/* 
        $match:
                Filters documents, similar to the find() query.
                Used to reduce the number of documents early in the pipeline for better performance
        
        $project:
                Selects, removes, renames, or creates fields in the output document.

        $group:
                Groups documents by a specified field and 
                performs aggregate calculations such as count, sum, average, minimum, and maximum
                using accumalator operators

        $sort:
                Sorts documents in ascending or descending order.

        $limit:
                Limits the number of documents returned.

        $skip:
                Skips a specified number of documents.

        
        $unwind:
                Deconstructs an array field into multiple documents.

        $lookup
                Performs a left outer join with another collection.

        
        $unset:
                Removes fields from documents.
*/