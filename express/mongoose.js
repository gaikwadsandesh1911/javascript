/*  🟢  MongoDB

        MongoDB is a NoSQL document based database that stores data in JSON-like format (BSON).

        “MongoDB is suitable when data is unstructured or rapidly changing, like social media apps, chat apps, or real-time systems.”

    
    🔄 Full Mapping (Remember this for interviews)

            SQL	                        MongoDB

            Database	                Database
            Table	                    Collection
            Row (Record)	            Document
            Column	                    Field

*/


/*  🟢  Mongoose

            Mongoose is an ODM (Object Data Modeling) library for MongoDB in Node.js.

            👉 It sits between Node.js and MongoDB.

            “MongoDB is schema-less(unstructured), which gives flexibility but can lead to inconsistent / messy data. 
             Mongoose solves this by providing a schema (structure) + validation

*/


/*  🟢  Data types in Mongoose
      
        name: String,
        age: Number,
        isActive: Boolean,
        createdAt: Date,
        userId: mongoose.Schema.Types.ObjectId
        skills: [String],           // array
        enum: ["pending", "approved", "rejected"]  // to restrict field value
        
*/


/*  🟢  Schema vs Model

            1. Schema (Blueprint / Structure)
                    “How data should look”

            2.  Model (Interface / Tool)
                    “How we interact with database”

                    we have pre-built methods on Model to interact with database
                    
                    Model is created from schema
                    
                    used to:
                        create document
                        query database

*/


/*  🟢  Schema options

        name: { type: String, required: true }
            👉 Field must be present

        role: { type: String, default: "user" }
            👉 If value not provided → default is used

        email: { type: String, unique: true }
            👉 No duplicate values (used for email, username)
            👉 also add indexing by default.
            

        age: { type: Number, min: 18, max: 60 }

        password: { type: String, minlength: 6, maxlength: 10}

        name: { type: String, trim: true }
            👉 Removes extra spaces

        email: { type: String, lowercase: true }
            👉 lowercase / uppercase

        email: {
            type: String,
            match: /.+\@.+\..+/
        }

       password: { type: String, select: false } 
            👉 Hidden in queries by default

        
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
            👉 ref (for relationships 🔥)
            👉 Used with .populate()



    🟢const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            match: [/.+\@.+\..+/, "Please enter a valid email"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false
        },
        role: {
            type: String,
            enum: {
            values: ["user", "admin"],
            message: "Role must be either user or admin"
            },
            default: "user"
        },
        age: {
            type: Number,
            min: [18, "Age must be at least 18"]
        }
    },{ timeStamps: true});

    
    👉unique does NOT use custom message like above.
        It throws MongoDB error:
        if (err.code === 11000) {
            console.log("Email already exists");
        }


*/


/*  🟢  Hooks in Mongoose

        👉 Hooks (middleware) are functions that run automatically 
        before or after database operations

        
        👉 pre() hook Runs before operation

        userSchema.pre("save", function (next) {
            console.log("Before save");
            next();
        });

        👉 post() hook Runs after operation

        userSchema.post("save", function (next) {
            console.log("Before save");        
        });


    🔵 Types of Hooks in Mongoose
    
        1. 📌 Document Middleware
            👉 Works on individual documents

        userSchema.pre("save", function (next) {
            console.log("Before saving user");
            next();
        });

        👉 Use cases:
            Password hashing 🔥
            Data modification

            🔥userSchema.pre("save", async function (next) {
                
                if (!this.isModified("password")) return next();

                try {
                    this.password = await bcrypt.hash(this.password, 10);
                    next();
                } catch (err) {
                    next(err);
                }
            });
            

        Common hooks:
            save
            validate
            remove

            👉 pre("save") works only on .save() and .create()
            ❌ NOT on updateOne()

            // when time of update password its not works



        2. 📌 Query Middleware
            👉 Works on queries

        Common hooks:
            find ,findOne, findOneAndUpdate
            updateOne, deleteOne etc

        userSchema.pre("find", function () {
            console.log("Before find query");
        });

        👉 Use cases:
            Logging queries
            Auto-filtering (e.g. hide inactive users)



        3. 📌 Model Middleware
            👉 Works on model-level operations

            userSchema.pre("insertMany", function (next, docs) {
                console.log("Before bulk insert");
                next();
            });

        
        4. 📌 Aggregate Middleware
            👉 Works on aggregation pipeline

            userSchema.pre("aggregate", function () {
                console.log("Before aggregation");
            });

            👉 Use case:
            Modify pipeline (e.g. add $match)


*/


/*  🟢  we can create custom methods in mongoose


        🔵 1. Schema Methods (Instance Methods)
            👉 Attached to documents (instances)

            userSchema.methods.comparePassword = async function (enteredPassword) {
                return await bcrypt.compare(enteredPassword, this.password);
                // 👉 this.password = hashed password from DB
                // 👉 enteredPassword = user input
            };

            const user = await User.findOne({ email });
            user.comparePassword("123456");


        🔵 2. Static Methods
            👉 Attached to model (collection level)

            userSchema.statics.findByEmail = function (email) {
                return this.findOne({ email });
                // 👉 this = model
            };

            User.findByEmail("test@gmail.com");


*/


/*  🟢  different method on model to interact with database



    🔵 1. Create Operations (Insert Data)

            User.create(data);
            new User(data).save();
            User.insertMany([data1, data2]);


    🟡 2. Read Operations (Fetch Data)

            User.find();
            User.findOne(filter);
            User.findById(id);

            filter = { email: req.body.email }

    🔴 3. Update Operations (Modify Data)

            User.updateOne(filter, update);
            User.updateMany(filter, update);
            User.findOneAndUpdate(filter, update);
            User.findByIdAndUpdate(id, update, { new: true, runValidators: true});

            👉 new: true                    
                    Return updated document
                    without it return old doc

            👉 runValidators: true
                    By default Mongoose does NOT run schema validations on update

    
    🟣 4. Delete Operations (Remove Data)

            User.deleteOne(filter);
            User.deleteMany(filter);
            User.findByIdAndDelete(id);
            User.findOneAndDelete(filter);

    🟠 5. Query Helpers / Modifiers   => used to refine queries

            User.find().select("name email");
            User.find().limit(10);
            User.find().skip(10);
            User.find().sort({ age: -1 });


    🟢 6. Utility Methods

            User.countDocuments();

            User.exists({ email });
            const result = await User.exists({ email: "test@gmail.com" });
            👉 only return    _id  - not full document
            👉 null    - if not found
            
            User.distinct("role");
            👉 retuns unique values of the field
                ["user", "admin"]
*/


/*  🟢   Operators in monggose.

        👉 operators always start with $ sign

        🔵 1. Comparison Operators

                $eq   // equal
                $ne   // not equal
                $gt   // greater than
                $gte  // greater than equal
                $lt   // less than
                $lte  // less than equal

                $in   // value in array
                $nin  // value not in array

                User.find({ age: { $gte: 18 } });
                User.find({ role: { $in: ["admin", "user"] } });


        🟡 2. Logical Operators

                $and        // all condition must true
                $or         // atleast one condition true
                $not        // Negates a condition (NOT).. it works with operators not with value.
                $nor        // where all conditions false

                User.find({
                    $or: [
                        { role: "admin" },
                        { age: { $lt: 18 } }
                    ]
                });

                

        🔴 3. Element Operators (Check field existence/type)

                $exists     // Checks if field exists
                $type       // Check if data type exists
                 

                User.find({ email: { $exists: true } });

                User.find({ email: { $exists: false } });
                👉 Returns documents where email field dos not exists


                User.find({ age: { $type: "number" } });
                👉 Returns document where age is number type only

                        $type: "string"
                        $type: "number"
                        $type: "bool"
                        $type: "array"
                        $type: "object"
                        $type: "objectId"
                        $type: "date"
                        $type: "null"


        🟣 4. Evaluation Operators (Advanced matching)

                $regex      // search on field
                $text       // search on collection, need text indexing
                $expr

                User.find({ name: { $regex: "san", $options: "i" } });


                User.find({
                    $text: { 
                        $search: "developer"
                        $caseSensitive: false 
                    }
                });

                👉 $text works ONLY if you create text index:
                userSchema.index({ bio: "text", name: "text" });



        🟠 5. Array Operators

                $all
                $size
                $elemMatch

                User.find({ skills: { $all: ["React", "Node"] } });
                👉 $all : User must have both skills


        🟤 6. Update Operators (Modify data)

                $set        // if field exist -> update, if not -> create
                $unset      // remove field
                $inc        // inc/dec num field
                $push       // add value to array       .. duplicate allow
                $pull       // remove value from array
                $addToSet   // add value if not exist  .. no duplicate allow

                User.updateOne(
                    { _id: id },
                    { $set: { name: "Sandesh" } }
                );

                User.updateOne(
                    { _id: id },
                    { $inc: { age: 1 } }
                );

                User.updateOne(
                    { _id: id },
                    { $push: { skills: "React" } }
                );


        🟤 7. Aggregation Operators (Advanced pipelines)

                $match      // filter doc like find()

                $group      // group docs to perform aggregation

                $project    // like select() but her can both hide/show
                
                $lookup     // join another collection
                
                $sort

                $limit

                ** first stage should be match and last should be limit or project(very common)



                User.aggregate([
                    { $match: { age: { $gte: 18 } } },
                    { $group: { _id: "$role", count: { $sum: 1 } } }
                ]);

               

*/


/*  🟢   Aggregation framework..

            Aggregation Framework is a way to process data in steps, 
            where the output of one stage becomes the input of the next stage.

            1. Accumulator Operators (Used in $group)

                $sum
                $avg
                $min
                $max
                $push
                $addToSet
                $count


            2. Arithmetic Operators
                
                $add
                $subtract
                $multiply
                $divide
                $mod

            
            3. we can also use logical, comparison operator.
*/


/* 
        populate() is used to replace a referenced ObjectId 
        with actual data from another collection

        const postSchema = new mongoose.Schema({
            title: String,
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        });


        👉Post.find().populate("userId");
                // show all data from other collection

        {
            title: "Post 1",
            userId: {
                _id: "123",
                name: "Sandesh",
                email: "test@gmail.com"
            }
        }



        👉Post.find().populate("userId", "name email");
                include name and email only


*/