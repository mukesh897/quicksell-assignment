// src/KanbanBoard.js
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import KanbanColumn from './KanbanColumn';
import './KanbanBoard.css';
import user1 from './assets/user1.jpg'; // Sample images for users
import user2 from './assets/user1.jpg';
import user3 from './assets/user1.jpg';
import user4 from './assets/user1.jpg';
import user5 from './assets/user1.jpg';
import urgent from './assets/urgent.svg'; // Sample images for priorities
import high from './assets/priority.svg';
import medium from './assets/mediumPriority.svg';
import low from './assets/lowPriority.svg';
import noPriority from './assets/No-priority.svg';

const userAvatars = {
  'usr-1': user1,
  'usr-2': user2,
  'usr-3': user3,
  'usr-4': user4,
  'usr-5': user5,
};

const priorityImages = {
  4: urgent,
  3: high,
  2: medium,
  1: low,
  0: noPriority,
};

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState({});
  const [groupBy, setGroupBy] = useState('status'); // default grouping
  const [sortBy, setSortBy] = useState('priority'); // default sorting

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
        const usersMap = data.users.reduce((acc, user) => {
          acc[user.id] = user.name;
          return acc;
        }, {});
        setUsers(usersMap);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const groupTickets = (tickets) => {
    switch (groupBy) {
      case 'status':
        return tickets.reduce((acc, ticket) => {
          acc[ticket.status] = acc[ticket.status] || [];
          acc[ticket.status].push(ticket);
          return acc;
        }, {});
      case 'user':
        return tickets.reduce((acc, ticket) => {
          acc[ticket.userId] = acc[ticket.userId] || [];
          acc[ticket.userId].push(ticket);
          return acc;
        }, {});
      case 'priority':
        return tickets.reduce((acc, ticket) => {
          acc[ticket.priority] = acc[ticket.priority] || [];
          acc[ticket.priority].push(ticket);
          return acc;
        }, {});
      default:
        return {};
    }
  };

  const sortTickets = (tickets) => {
    switch (sortBy) {
      case 'priority':
        return tickets.sort((a, b) => b.priority - a.priority);
      case 'title':
        return tickets.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return tickets;
    }
  };

  const groupedTickets = groupTickets(tickets);
  const sortedGroupedTickets = Object.keys(groupedTickets).reduce((acc, key) => {
    acc[key] = sortTickets(groupedTickets[key]);
    return acc;
  }, {});

  return (
    <div className="kanban-board">
      <Navbar setGroupBy={setGroupBy} setSortBy={setSortBy} />
      <div className="columns-container">
        {Object.keys(sortedGroupedTickets).map(group => (
          <KanbanColumn
            key={group}
            group={group}
            tickets={sortedGroupedTickets[group]}
            userAvatars={userAvatars}
            priorityImages={priorityImages}
            users={users}
            groupBy={groupBy}
            sortBy={sortBy}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
