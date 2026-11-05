/* useTransition()

   with useTransition hook, we can mark certain state updates as non-urgent (low priority), 
   so that urgent updates like (input typing, button click) can happen without being freezed or blocked.

*/

const [isPending, startTransition] = useTransition();

/*
   isPending:         Indicates whether the Transition is pending
   startTransition:   Function used to mark state updates as non-urgent

*/

import { useState, useTransition } from "react";

function SearchProducts() {

    const [search, setSearch] = useState("");
    const [filteredSearch, setFilteredSearch] = useState("");

    const [isPending, startTransition] = useTransition();

    function handleChange(e) {

        const value = e.target.value;

        // Urgent update
        setSearch(value);

        // Non-urgent update
        startTransition(() => {
            setFilteredSearch(value);
        });
    }

    const products = [
        "Laptop",
        "Mobile",
        "Keyboard",
        "Mouse",
        "Monitor"
    ];

    const filteredProducts = products.filter(product =>
        product.toLowerCase().includes(filteredSearch.toLowerCase())
    );

    return (
        <div>

            <input
                value={search}
                onChange={handleChange}
                placeholder="Search products"
            />

            {isPending && <p>Updating results...</p>}

            {filteredProducts.map(product => (
                <p key={product}>{product}</p>
            ))}

        </div>
    );
}

export default SearchProducts;

/*

- User types a character.

- setSearch(value) updates the input immediately.

- startTransition() marks the filtered-search state update as non-urgent.

  React can prioritize urgent updates over the Transition.

  isPending tells us whether the Transition is still pending.

  **** It controls the priority of UI updates,

  *** Q6. Is useTransition the same as debouncing?
        No.
        Debouncing delays execution until the user stops triggering an event.
        useTransition changes the priority of React state updates.
        
        
        debouncing is for reducing api calls.
        useTransition is for priotize ui rendering


*/