import { useState } from "react";

const tabs = [
  { id: 1, label: "Home", content: "Welcome to Home" },
  { id: 2, label: "About", content: "About us page" },
  { id: 3, label: "Contact", content: "Contact us here" },
];

export default function Tabs() {
  const [activeId, setActiveId] = useState(1);
  const activeTab = tabs.find((tab) => tab.id === activeId);
  return (
    <div className="tab-container">
      <div className="tab-headers">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveId(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {activeTab ? activeTab.content : "no content"}
      </div>
    </div>
  );
}

