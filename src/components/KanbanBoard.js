import React from 'react';
import TicketCard from './TicketCard';
import './KanbanBoard.css';
import ThreeDotMenuIcon from '../icons/3 dot menu.svg';
import AddIcon from '../icons/add.svg';
import { getPriorityIcon, getStatusIcon } from './utils';

const priorityLabels = {
  0: 'No Priority',
  1: 'Low',
  2: 'Medium',
  3: 'High',
  4: 'Urgent'
};

const statusLabels = {
  todo: 'To Do',
  inprogress: 'In Progress',
  backlog: 'Backlog',
  cancelled: 'Cancelled'
};

const KanbanBoard = ({ tickets, users, groupBy, sortBy }) => {


  const getUserName = (userId) => {
    if (!users || users.length === 0) return 'Unassigned';
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unassigned';
  };


  const groupTickets = (tickets) => {
    let grouped = {};

    if (groupBy === 'status') {
      grouped = tickets.reduce((acc, ticket) => {
        const key = (ticket.status || '').toLowerCase().replace(' ', ''); 
        acc[key] = acc[key] ? [...acc[key], ticket] : [ticket];
        return acc;
      }, {});


      Object.keys(statusLabels).forEach(status => {
        if (!grouped[status]) {
          grouped[status] = [];
        }
      });
    } else if (groupBy === 'user') {
      grouped = tickets.reduce((acc, ticket) => {
        const key = ticket.userId || 'Unassigned';
        acc[key] = acc[key] ? [...acc[key], ticket] : [ticket];
        return acc;
      }, {});
    } else if (groupBy === 'priority') {
      grouped = tickets.reduce((acc, ticket) => {
        const key = ticket.priority;
        acc[key] = acc[key] ? [...acc[key], ticket] : [ticket];
        return acc;
      }, {});
    }

    return grouped;
  };

 
  const sortTickets = (tickets) => {
    if (sortBy === 'priority') {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === 'title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const groupedTickets = groupTickets(tickets);

  return (
    <div className="kanban-board">
     
      {groupBy === 'status' && Object.keys(statusLabels).map((statusKey, idx) => (
        <div key={idx} className="kanban-column">
          <div className="column-header">
            <div className="priority-icon-container">
              <img 
                src={getStatusIcon(statusLabels[statusKey].toLowerCase())}
                alt={`${statusLabels[statusKey]} icon`} 
                className="priority-icon" 
              />
              <h3>{statusLabels[statusKey]} - {groupedTickets[statusKey]?.length || 0}</h3>
            </div>
            <div className="header-actions">
              <button className="add-button">
                <img src={AddIcon} alt="Add ticket" />
              </button>
              <button className="menu-button">
                <img src={ThreeDotMenuIcon} alt="More options" />
              </button>
            </div>
          </div>
          {sortTickets(groupedTickets[statusKey] || []).map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}

      {groupBy === 'user' && Object.keys(groupedTickets).map((userId, idx) => (
        <div key={idx} className="kanban-column">
          <div className="column-header">
            <h3>{getUserName(userId)}</h3>
            <div className="header-actions">
              <button className="add-button">
                <img src={AddIcon} alt="Add ticket" />
              </button>
              <button className="menu-button">
                <img src={ThreeDotMenuIcon} alt="More options" />
              </button>
            </div>
          </div>
          {sortTickets(groupedTickets[userId] || []).map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}

      {groupBy === 'priority' && Object.keys(groupedTickets).map((priorityKey, idx) => (
        <div key={idx} className="kanban-column">
          <div className="column-header">
            <div className="priority-icon-container">
              <img 
                src={getPriorityIcon(Number(priorityKey))}
                alt={`${priorityLabels[priorityKey]} icon`} 
                className="priority-icon" 
              />
              <h3>{priorityLabels[priorityKey]} - {groupedTickets[priorityKey]?.length || 0}</h3>
            </div>
            <div className="header-actions">
              <button className="add-button">
                <img src={AddIcon} alt="Add ticket" />
              </button>
              <button className="menu-button">
                <img src={ThreeDotMenuIcon} alt="More options" />
              </button>
            </div>
          </div>
          {sortTickets(groupedTickets[priorityKey] || []).map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
