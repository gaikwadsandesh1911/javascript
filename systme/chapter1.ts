/* Reliability, Scalability and Maintainability

Whenever you're designing any backend, ask only three questions:

    1.  Will it keep working, when things go wrong? (Reliability)

    2.  Will it handle growth? (Scalability)

    3.  Can my team maintain it in next 2-3 years? (Maintainability)
*/


// ---------------------------------------------------------


/* 1. Reliability — "Will the system still work when things go wrong?"

        The author doesn't ask:
            "Will the system work?"

        He asks:
            "Will it continue working when something fails?"

        Because in production, something is always failing.

        suppose:

            Database restarts
            Redis crashes
            LLM times out
            Network becomes slow
            Developer deploys a bug

        A reliable system doesn't panic.

        It:

            retries requests,
            shows graceful error messages,
            recovers automatically,
            doesn't lose user data.

*/


        /*  Fault vs Failure

            Fault

                One component breaks.
                    eg. Redis crashes.

            Failure

                The entire application stops serving users.


            *** A good system prevents a single fault from becoming a system-wide failure.

        */


        /*  Why do systems fail?

            1. Hardware faults

                Example:

                    Disk dies
                    RAM fails
                    Server loses power

                These happen surprisingly often in large systems, so we use redundancy and replication.

            
            2. Software faults

                Example:

                    Memeory leak

            3. Human faults

                Example:
        
                    DROP DATABASE production;
                    Wrong environment variable.
                    Wrong deployment

        */


// ---------------------------------------------------------


/* 2. Scalability — "Can it grow?"

    Many people think:
        Scalability means handling millions of users.

    Not exactly, But Scalabality means
         If the Load doubles, 
         what changes do we need to make so the system still performs well?

    Load

        Before scaling, you need to know what is increasing.

        Possible load parameters include:

            Requests per second
            Number of users
            Data size
            Read/write ratio
            File uploads

        *** Your scaling strategy depends on which of these is growing.

*/


// ---------------------------------------------------------


/* 3. Maintainability — "Can new developers keep working on it?"

        - Can a new developer understand it?
        - Can you safely add a feature?
    If not, the system isn't maintainable.

    Maintainability can be break into three qualities: 
    
        1.  operability (easy to run), 
        2.  simplicity (easy to understand), and 
        3.  evolvability (easy to change).

*/


// ---------------------------------------------------------


/*  Assume everything will eventually fail.

    Design in a way that, failure is expected, isolated( fault of one component, doesn't affect the other component ), and recoverable.

        Ask "What if..." repeatedly

        For every feature:

            What if the network disconnects?
            What if the server restarts?
            What if the database is slow?
            What if Redis is empty?
            What if the user refreshes the page?
            What if two requests happen simultaneously?
            What if the payment succeeds but saving the order fails?
            What if the queue contains duplicate jobs?
            What if the admin uploads the same PDF twice?
            What if the AI provider returns malformed output?

*/


