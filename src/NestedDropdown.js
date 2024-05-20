import React, { useState } from 'react';
import './NestedDropdown.css';

const NestedDropdown = ({ title, items }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="nested-dropdown">
      <button className="dropdown-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
        {title}
      </button>
      {dropdownOpen && (
        <div className="nested-dropdown-menu">
          {items.map(item => (
            <button
              key={item.label}
              className="dropdown-item"
              onClick={() => {
                item.onClick();
                setDropdownOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NestedDropdown;
