/* Controlled and Uncontrolled component:

    Controlled component:

        The input value is controlled by React state.

    Un-Controlled component:

        The input value is managed by DOM itself. 
        We access the value using a ref.
            
*/

import { useState } from "react";

// controlled
const [name, setName] = useState("");

<input value={name} onChange={(e) => setName(e.target.value)} />;


// uncontrolled
const inputRef = useRef();

<input ref={inputRef} />;

console.log(inputRef.current.value);

// -----------------------------------------------------------

/* 
    To make a checkbox/radio a controlled component. 
    it's checked state must be controlled by React state using the checked prop.

    If a checkbox or radio button has no checked attribute, 
    it is generally uncontrolled from React's perspective.

*/

const [isChecked, setIsChecked] = useState(false);

<input
  type="checkbox"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>;

const [gender, setGenger] = useState("");

<div>
  <input
    type="radio"
    name="gender"
    value="male"
    checked={gender == "male"}
    onChange={(e) => setGenger(e.target.value)}
  />
  <input
    type="radio"
    name="gender"
    value="female"
    checked={gender === "female"}
    onChange={(e) => setGender(e.target.value)}
  />
</div>;

// -----------------------------------------------------------

