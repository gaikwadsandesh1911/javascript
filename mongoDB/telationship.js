/* Relationship 

       mongodb supports relationship between documents through two approaches:
          1. embeddings
          2. referencing
    
      Embedding:
          means storing related data inside the same document using nested objects or arrays.

      Referencing 
          means storing the _id of another document instead of embedding the complete data.

*/

// embedding
{
  name: "Sandesh",
  email: "sandesh@example.com",
  address: {
    city: "Ambarnath",
    state: "Maharashtra"
  }
}



// referencing

// user collection
{
  _id: 1,
  name: "Sandesh"
}

// order collection
{
  _id: 101,
  product: "Laptop",
  userId: 1       //userId refers to user document       
}


/* join

   MongoDB provides the $lookup aggregation stage to perform join-like operations between collections.

   from: Collection to join.
   localField: Field in the current collection.
   foreignField: Matching field in the other collection.
   as: Name of the resulting array field.

*/

db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails"
    }
  }
]);

// with mongoose we use populate() method

const postSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const posts = await Post.find().populate("author");


// select specific fields
const posts = await Post.find().populate("author", "name email");



