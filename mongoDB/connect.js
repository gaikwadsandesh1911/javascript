// mongosh  =>  mongo shell to connect to mongodb database


// show available databases;
show dbs


// create or switch database
use dbName
/* 
    use   
        command only switches the current database context. 
        The database is actually created only after you insert the first document or otherwise store data in it. 
        
        That's why an empty database won't appear in show dbs.
*/


// verify database
db


/* database statistics  
        
        - DB name
        - No. of collections
        - No. of objects(documents)
        - storage size
        - index information
*/
db.stats()


// drop database
db.dropDatabase()


// create collection explicitly.
db.createCollection("students")

// OR MongoDB creates collections automatically when you insert the first document.
db.students.insertOne({
  name: "Sandesh"
})

// show available collection
show collections

// collection stats
db.students.stats()


// drop collection
db.students.drop()



//  ** Get Help **

// general help
help

// database methods
db.help()

// collection methods
db.students.help()



// clear mongosh
cls 

// exit mongosh
exit
