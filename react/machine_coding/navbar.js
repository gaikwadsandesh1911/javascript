import { useEffect, useReducer, useRef, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // close navbar when click on menu-items
  const closeMenu = () => {
    setOpen(false);
  };

  // close navbar when click outside
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpen(false);
      }

    //   👉 e.target = exact element user clicked
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <nav className="navbar" ref={navRef}>
      <div>My Logo</div>
      <ul className={`${open ? "active" : ""}`}>
        <li onClick={closeMenu}>
          <a href="#">Home</a>
        </li>
        <li onClick={closeMenu}>
          <a href="#">About</a>
        </li>
        <li onClick={closeMenu}>
          <a href="#">Services</a>
        </li>
        <li onClick={closeMenu}>
          <a href="#">Contact</a>
        </li>
      </ul>
      <div className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </div>
    </nav>
  );
}

/* 
    by default

            hamburger   =>  hidden
            navLinks    =>  visible

    768px 
            hamburger   =>  visible
            navLinks    =>  hidden

    hamburger Click
            state change(toggle)
            navLinks css change

*/



/* 

// hide on desktop

.hamburger {
  display: none;
}


@media (max-width: 768px) {

  .hamburger {
    display: block;
  }

  ul {
    display: none;
  }
    
  ul.active {
    display: flex;
    flex-direction: column;
    width: 100%;
    background: #333;
    position: absolute;
    top: 60px;
    left: 0;
    padding: 20px;
  }
}

*/
