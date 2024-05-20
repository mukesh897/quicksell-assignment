// src/KanbanColumn.js
import React from 'react';
import KanbanCard from './KanbanCard';
import './KanbanColumn.css';
import add from './assets/add.svg';
import threeDots from './assets/threeDots.svg' 


const KanbanColumn = ({ group, tickets, userAvatars, priorityImages, users, groupBy, sortBy }) => {
  const getTitle = () => {
    if (groupBy === 'user') {
      return (
        <>
          <img src={userAvatars[group]} alt={users[group]} className="column-avatar" />
          <span>{users[group]}</span>
        </>
      );
    } else if (groupBy === 'priority') {
      const priorityMap = {
        4: 'Urgent',
        3: 'High',
        2: 'Medium',
        1: 'Low',
        0: 'No Priority',
      };
      return (
        <>
          <img src={priorityImages[group]} alt={priorityMap[group]} className="column-avatar" />
          <span>{priorityMap[group]}</span>
        </>
      );
    } else {
      return <span>{group}</span>;
    }
  };

  return (
    <div className="kanban-column">
        <div className="wraw"
        >
            <div className="column-header">
                {getTitle()}
            </div>
            <div>
                <img src={add} alt={'+'} className="side-img" />
                <img src={threeDots} alt={'...'} className="side-img" />
            </div>

        </div>
      
      <div className="column-body">
        {tickets.map(ticket => (
          <KanbanCard
            key={ticket.id}
            ticket={ticket}
            userAvatars={userAvatars}
            priorityImages={priorityImages}
            sortBy={sortBy}
            groupBy={groupBy}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
