import React from "react";

import "./item-status-filter.css";

const ItemStatusFilter = props => {
  const filterButtons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "done", label: "Done" }
  ];

  const { filter, onFilterChange } = props;

  const buttons = filterButtons.map(({ name, label }) => {
    const isActive = filter === name;
    const clazz = isActive ? "btn-info" : "btn-outline-secondary";

    return (
      <button
        type="button"
        className={`btn ${clazz}`}
        key={name}
        onClick={() => onFilterChange(name)}
      >
        {label}
      </button>
    );
  });

  return <div className="btn-group">{buttons}</div>;
};

export default ItemStatusFilter;
