/*  Tabs Component


import { useState } from "react";

const tabs = [
  { label: "Home", content: "Welcome to Home" },
  { label: "About", content: "About us page" },
  { label: "Contact", content: "Contact us here" },
];

export default function Tabs() {

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="tab-container">
      <div className="tab-headers">
        {tabs.map((tab, i) => (
          <button key={i} onClick={() => setActiveIndex(i)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeIndex].content}</div>
    </div>
  );
}

*/

// -------------------------------------------------------------------------

/* Accordian

import { useState, useRef } from "react";

const data = [
  { id: 1, question: "What is React?", answer: "React is a UI library" },
  { id: 2, question: "What is useState?", answer: "Hook for state" },
  { id: 3, question: "What is JSX?", answer: "JS + XML" },
];

export default function Accordian() {

  const [activeIndex, setActiveIndex] = useState(null);

  const contentRef = useRef({});

  const handleActive = (id) => {
    // toggle if active
    setActiveIndex(activeIndex === id ? null : id);
  };

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <div className="questions" onClick={() => handleActive(item.id)}>
            {item.question}

            // transition not possible with this approach 
            // <span>{activeIndex == item.id ? "⬆" : "⬇"}</span>

            <span
              style={{
                transition: "transform 0.3s ease ",
                transform:
                  activeIndex === item.id ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              ⬇
            </span>
          </div>

          // transition is not possibel with this approach, because u remove component from dom 
          // {activeIndex === item.id && (
          //   <div className="answers">{item.answer}</div>
          // )} 

          <div
            className="answers"
            ref={(el) => (contentRef.current[item.id] = el)}
            style={{
              maxHeight:
                activeIndex === item.id
                  ? contentRef.current[item.id]?.scrollHeight + "px"
                  : "0px",
              overflow: "hidden",
              transition: "max-height 0.3s ease",
            }}
          >
            <div style={{ padding: "10px" }}>{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
 
  🧠    "State controls open, 
        ref gets height of each content, 
        max-height animates it." 
    
  👉  we use maxHeight 
        if active === item.id max-height: 0; overflow: hidden
        if Active will give heigth of content using scrollHeight property


  👉  scrollHeight -> 
        to get actual height of content. we may have different size content
            if we ommit ref, and give static height, its not work perfeclty

        
  👉  ref={(el) => (contentRef.current[item.id] = el)}
        “When this element is created, store it in ref using its id, 
        so each element has different id now”

        we can use this to get/set maxHeight

        we have multiple elements thats why callback
        "I have many items → I need a map → store each in DOM using id"

*/

// -------------------------------------------------------------------------

/* modal with portal

"Portal allows us to render a component outside the parent DOM hierarchy."
"So it avoid issues like z-index, overflow, and layering when building modals,

from component we return createPortal(<div> </div/, document.getElementById("modal-root"))


// index.html

<div id="modal-root"></div>


// ModalDemo.jsx

import { useState } from "react";
import Modal from "./Modal";
export default function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>open modal</button>
      {isOpen && <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </div>
  );
}


// Modal.jsx

import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose }) {
  // if (!isOpen) return null;

  // prevent background scrolling...
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h1>modal Title</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis,
          ducimus.
        </p>
        <button onClick={onClose}>close</button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}



.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);

  display: flex;
  justify-content: center;
  align-items: center;
}


*/

