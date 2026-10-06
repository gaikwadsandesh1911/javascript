/* On every re-renders of the component:

    - primitive values are re-evaluted.

    - non-primitive and functions re-created,
      means new reference is assigned to them.

    
    There is no problem in that, React is built like that way.
    Thats how react detect the changes, and efficiently update the UI.
        
    But it becomes problem in two situation:
    
    - when expensive function runs on every re-renders cause freeze the UI.
        solution: useMemo

    - chilid component re-render un-necessory when parent component re-rendes.
        solution: useCallback

*/

/* 
  - useMemo()        memoizes the result (value) of a expensive computation.

  - useCallback()    memoizes a function so it isn't recreated on every render. 

  - React.memo()     memoize component.

  These hooks are used to optimize performance of an application.

        
  React.memo():
    React.memo is a Higher-Order Component (HOC) 
    that memoizes a component and prevents it from un-necessary-rendering 
    if its props have not changed.

*/