import React, { useState } from 'react';
import "./Tabs.css";

function Tabs(props) {
  const [activeTab, setActiveTab] = useState(props.defaultTab);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <div className="tabs__header">
        {props.tabs.map((tab) => (
          <div
            key={tab}
            className={`tabs__tab ${tab === activeTab ? 'tabs__tab--active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="tabs__content">
        {props.children.map((child, index) => (
          <div key={index} className={`tabs__pane ${props.tabs[index] === activeTab ? 'tabs__pane--active' : ''}`}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tabs;