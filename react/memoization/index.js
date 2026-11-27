/*  state update and re-rendering.

    When we update state, React compares the new state with the previous state 
    using its internal Object.is() method.

    where primitive types are compare by value and object types are compare by reference.

    If React detects a change, it schedules the component for re-rendering.



    During re-rendering? The component executes again."

    - Primitive values: Their expressions are evaluated again. their value may remain same.

    - New references are created for objects, arrays and functions.
    
    
    There is no problem in that, react is built like that way.
    But problem is where: 
      - when some functions inside component execute on every renders, 
        it may freeze ui if they perform cpu heavy task and 
      - child component un-necessorily render with parent component.


    Solution to this:

  - useMemo           
       cache calculated value of its callback function, 
       and if its dependency has not changed, it does not execute its callback again.
       If dependency changes it execute its callback again and caches new calculated value.
       

  - useCallback
       caches its callback function reference itself,
       and if dependency has not changed between renders it returns same reference.
       when pass as prop to child component, child receives same function reference.
       

  - React.memo()      
       It' higher order component, which skip rendering of component,
       if its props has not changed.

*/  