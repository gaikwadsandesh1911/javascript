/* 
    data mutation means changing data (create, update, delete) and then 
    making sure the UI shows the latest state.

    Server Actions.

        Server Actions are asynchronous function that are
        executed on server only.

        They can be called in Server and Client component to handle
        form submission and data mutations in Next.js application.
        without creating api endpoint.

        we enable it with 'use server' directive.
        at function level or file level.


    useFormStatus()
    
        is a React hook used with Server Actions. That lets us track the status of a form submission. 
        It is commonly used to show loading states, disable buttons, or display submission progress 
        while the form is being submitted.
*/