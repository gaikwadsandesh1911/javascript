
<body>
    <noscript> You need to enable JavaScript to run this app. </noscript>
    <div id="root"></div>
    <div id="modal-root"></div>
</body>

// -------------------------------------------------------------------------------------

import { useState } from "react";
import Modal from "./Modal";

export default function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>open modal</button>
      {isOpen && <Modal onClose={() => setIsOpen(false)} />}
    </div>
  );
}

// -------------------------------------------------------------------------------------

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({onClose }) {

  // track modal to check if click outside(overlay)
  const modalRef = useRef(null);

  useEffect(() => {

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);


  // close on Esc button
  useEffect(() => {

    const escHandler = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", escHandler);
    return () => {
      document.removeEventListener("keydown", escHandler);
    };
  }, [onClose]);


  // prevent background scrolling...
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
        document.body.style.overflow = originalOverflow;
    };
}, []);

  return createPortal(
    <div className="overlay">
      <div className="modal" ref={modalRef}>
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

// -------------------------------------------------------------------------------------


/*   
    createPortal is used to render a React component outside its parent DOM hierarchy

    Normally, React components render inside their parent in the DOM tree.
    But sometimes we want a component (like a modal) to appear at the top level of the DOM, 
    to ignore parent styles like overflow or z-index.
    That’s where createPortal is used.

*/


/* 

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    }

    .modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    } 
  
*/
