// src/KanbanCard.js
import React from 'react';
import './KanbanCard.css';

const KanbanCard = ({ ticket, userAvatars, priorityImages, sortBy }) => {
  const getIcon = () => {
    if (sortBy === 'user') {
      return <img src={priorityImages[ticket.priority]} alt="Priority Icon" className="icon" />;
    } else {
      return <img src={userAvatars[ticket.userId]} alt="User Avatar" className="icon" />;
    }
  };

  return (
    <div className="kanban-card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <span className="icon-container">
          {getIcon()}
        </span>
      </div>
      <div className="card-body">
        <p className="ticket-title">{ticket.title}</p>
        <div className="ticket-tags">
            <img src={priorityImages[ticket.priority]} alt="Priority Icon" className="icon" />
          {ticket.tag.map(tag => (
            <span key={tag} className="ticket-tag">
                {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
