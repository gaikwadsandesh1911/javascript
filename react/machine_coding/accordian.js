import { useState } from "react";

const data = [
    {
      id: 1,
      question: "What is React?",
      answer: "React is js library for building User Interfaces",
    },
    {
      id: 2,
      question: "What is useState?",
      answer:
        "useState is react hook which is used to handle state in functional component",
    },
    {
      id: 3,
      question: "What is JSX?",
      answer:
        "Jsx stands for javascript xml. It is just syntax extension for javascript used in react",
    },
];

export default function Accord() {
  
  const [activeId, setActiveId] = useState(null);

  const showAns = (id) => {
     // toggle effect
    setActiveId(activeId == id ? null : id);
  };

  return (
    <div>
      <h2>Accord...</h2>
      {data.map((item) => (
        <div key={item.id}>
          <div onClick={() => showAns(item.id)} className="questions">
            <span>{item.question}</span>
            <span>{item.id === activeId ? "🔼" : "🔽"}</span>
          </div>
          {item.id === activeId && <div className="answers">{item.answer}</div>}
        </div>
      ))}
    </div>
  );
}


/* 
        This is simple accordian, good for an intereview.

        but not for production. because we can't add transition on content
        because we conditionally render content( && ).
*/

/* 
        <span
              style={{
                transition: "transform 0.3s ease ",
                transform:
                  activeIndex === item.id ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              ⬇
        </span


        const contentRef = useRef({});


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
            <div>{item.answer}</div>
        </div>

*/