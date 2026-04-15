/* 🔷   Redis


        “Redis is an in-memory database, 
        which means it stores data in RAM instead of disk. 
        Because of this, it is extremely fast and is mainly used for 
        caching, session storage, and real-time applications.”

        “Traditional databases like MongoDB or MySQL store data on disk (SSD), 
        which makes them slower compared to Redis. 
        Redis stores everything in memory, so data access is much faster.”

        “Accessing data from RAM takes nanoseconds, 
        whereas SSD access takes microseconds. 
        So Redis can be roughly 100 to 1000 times faster than disk-based databases.”

        “We don’t replace traditional databases with Redis. 
        Instead, we use Redis alongside them as a caching layer 
        to reduce database load and improve performance.”

        “So in a typical system, Redis improves speed, while the main database ensures data durability.”

        “Because Redis is memory-based, it’s expensive and not ideal for large permanent storage. 
        That’s why we combine it with a persistent database.”


        🎯 since Redis stores data in RAM, the data can be lost when the system shuts down. 
            However, Redis provides persistence mechanisms to avoid complete data loss.”


        “Redis can save data to disk using two methods:

            1.  RDB (snapshotting) – takes periodic snapshots of data

            2.  AOF (Append Only File) – logs every write operation

            So even if the system restarts, data can be recovered.”


        🎯 data is stored in key:value pair

            we have different data types as well

*/



/*      🎯 “We use Redis as a caching layer between Express server and database 
            to reduce repeated DB calls and improve response time.”

        Client → Express API → Redis (check cache)
                      ↘
                       MongoDB (if cache miss)

        
        Where SHOULD we use Redis?

            🎯 Caching frequently read data
                Product list
                User profile

            🚦 Rate limiting

            📩 OTP / email verification
                Store OTP in Redis

*/


/*  🎯 Run redis on docker


        docker run -d -it -p 6379:6379 --name my-redis redis

            by default redis runs on 6379 port
            --name is name of the container
            redis is name of the image

        run redis-cli in docker

            docker exec -it my-redis redis-cli

            it shows:

                127.0.0.1:6379>

                    type: 
                        ping

                    will res
                        pong

                    means successfull connected..
                    


        install redis in exprss
            
            npm i redis

            in project we use cloud version of redise

                upstash redis.

    

*/

/* 
    
*/