
import LowPriorityIcon from '../icons/Img - Low Priority.svg';
import MediumPriorityIcon from '../icons/Img - Medium Priority.svg';
import HighPriorityIcon from '../icons/Img - High Priority.svg';
import UrgentPriorityIcon from '../icons/SVG - Urgent Priority colour.svg';
import NoPriorityIcon from '../icons/No-priority.svg';
import TodoIcon from '../icons/To-do.svg';
import InProgressIcon from '../icons/in-progress.svg';
import BacklogIcon from '../icons/Backlog.svg';
import CancelledIcon from '../icons/Cancelled.svg';

export const getPriorityIcon = (priority) => {
  switch (priority) {
    case 0:
      return NoPriorityIcon;
    case 1:
      return LowPriorityIcon;
    case 2:
      return MediumPriorityIcon;
    case 3:
      return HighPriorityIcon;
    case 4:
      return UrgentPriorityIcon;
    default:
      return LowPriorityIcon;
  }
};

export const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case 'todo':
      return TodoIcon;
    case 'in progress':
      return InProgressIcon;
    case 'backlog':
      return BacklogIcon;
    case 'cancelled':
      return CancelledIcon;
    default:
      return TodoIcon; 
  }
};