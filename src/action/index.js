import {
  ADD_REMINDER,
  CLEAR_REMINDERS,
  REMOVE_REMINDER,
  COMPLETE_REMINDER,
} from '../types';
export const add_Reminder = (text, date) => {
  const action = {
    type: ADD_REMINDER,
    text,
    date,
  };
  return action;
};
export const rem_Reminder = (id) => {
  const action = {
    type: REMOVE_REMINDER,
    id,
  };
  return action;
};
export const clear_Reminders = () => {
  const action = {
    type: CLEAR_REMINDERS,
  };
  return action;
};
export const complete_Reminder = (id) => {
  const action = {
    type: COMPLETE_REMINDER,
    id,
  };
  return action;
};
