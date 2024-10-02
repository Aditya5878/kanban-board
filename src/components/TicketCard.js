
import React from 'react';
import { getPriorityIcon, getStatusIcon } from './utils';
import './TicketCard.css';
import ThreeDotMenuIcon from '../icons/3 dot menu.svg';

const TicketCard = ({ ticket }) => {
  const priorityIcon = getPriorityIcon(ticket.priority);
  const statusIcon = getStatusIcon(ticket.status);
  const tags = ticket.tag || [];

  return (
    <div className="ticket-card">
      <div className="ticket-content">
        <div className="cam-number">
          <span>CAM-{ticket.id.split('-')[1]}</span>
        </div>
      </div>
      <div className="ticket-header">
        <img src={statusIcon} alt={`Status icon`} className="status-icon small-svg" />
        <h4 className="title small-text">{ticket.title}</h4>
        <div className="ticket-actions">
          <button className="menu-button">
            <img src={ThreeDotMenuIcon} alt="More options" />
          </button>
        </div>
      </div>
      <div className="tags">
      <img src={priorityIcon} alt={`Priority icon`} className="priority-icon small-svg" />
        {tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default TicketCard;