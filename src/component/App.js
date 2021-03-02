import React, { Component } from 'react';
import {
  add_Reminder,
  rem_Reminder,
  clear_Reminders,
  complete_Reminder,
} from '../action';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import icon from '../remind.svg';
import 'react-datepicker/dist/react-datepicker.css';
import { bake_cookie, read_cookie } from 'sfcookies';
import { Modal } from 'react-bootstrap';
class App extends Component {
  state = {
    text: '',
    date: Date.now(),
    displayChecked: false,
    displayRemoved: false,
    completed: [],
    removed: [],
  };
  removed = read_cookie(this.state.removed);
  completed = read_cookie(this.state.completed);
  componentDidMount() {
    this.setState({ completed: this.completed, removed: this.removed });
  }
  renderReminders = () => {
    const { reminders } = this.props;

    return (
      <ul className="list-group">
        {reminders.map((reminder) => {
          return (
            <li key={reminder.id} className="list-group-item">
              <div>{reminder.text}</div>
              <div>{moment(new Date(reminder.date)).fromNow()}</div>
              <button
                className="remove btn btn-outline-danger"
                onClick={() => {
                  this.setState({ removed: [...this.state.removed, reminder] });
                  bake_cookie('removed', this.state.removed);
                  this.props.rem_Reminder(reminder.id);
                }}
              >
                <i className="fa fa-ban"></i>
                remove
              </button>
              <button
                className="remove btn btn-outline-success"
                onClick={() => {
                  this.setState({
                    completed: [...this.state.completed, reminder],
                  });
                  bake_cookie('completed', this.state.completed);
                  this.props.complete_Reminder(reminder.id);
                }}
              >
                <i className="fa fa-check"></i>
                check
              </button>
            </li>
          );
        })}
      </ul>
    );
  };
  render() {
    let { completed, removed } = this.state;
    const handlehide = () => {
      this.setState({ displayRemoved: false, displayChecked: false });
    };
    return (
      <div className="App">
        <img src={icon} alt="icon" />
        <div className="reminder-title">
          <h2>What Should I do</h2>
        </div>
        <div className="history">
          <button
            className="btn btn-danger"
            onClick={() => this.setState({ displayRemoved: true })}
          >
            <i className="fa fa-trash-o"></i>removed
          </button>
          <button
            className="btn btn-success"
            onClick={() => this.setState({ displayChecked: true })}
          >
            <i className="fa fa-calendar-check-o "></i>checked
          </button>
        </div>

        <input
          className="form-control"
          type="text"
          value={this.state.text}
          placeholder="Enter What I think"
          onChange={(e) => {
            this.setState({ text: e.target.value });
          }}
        />
        <DatePicker
          className="form-control datePicker"
          placeholderText="Enter a date"
          selected={this.state.date}
          value={this.state.date}
          onChange={(date) => this.setState({ date: date })}
          showTimeSelect
          minDate={moment().toDate()}
        />

        <button
          className="btn btn-primary btn-lg btn-block"
          onClick={() => {
            this.props.add_Reminder(this.state.text, this.state.date);

            this.setState({ text: '', date: '' });
          }}
        >
          <i className="fa fa-plus"></i>
          Add Reminder
        </button>

        <button
          className="btn btn-danger btn-lg btn-block clear"
          onClick={() => {
            const cleared = this.props.reminders;
            cleared.map((clear) =>
              this.setState({ removed: [...this.state.removed, clear] })
            );
            this.props.clear_Reminders();
            bake_cookie('removed', this.state.removed);
          }}
        >
          <i className="fa fa-trash"></i>
          Clear Reminders
        </button>
        <Modal show={this.state.displayChecked} onHide={() => handlehide()}>
          <Modal.Header>Completed !!!</Modal.Header>
          <Modal.Body>
            {completed.map((complete) => (
              <div key={complete.id}>
                <h4>reminder</h4>
                <p>{complete.text} </p>
                <h4>Date</h4>
                <p>{complete.date.toString()} </p>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-danger btn-lg"
              onClick={() => this.setState({ displayChecked: false })}
            >
              Ok
            </button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.displayRemoved} onHide={() => handlehide()}>
          <Modal.Header>Removed !!!</Modal.Header>
          <Modal.Body>
            {removed.map((remove) => (
              <div key={remove.id}>
                <h4>reminder</h4>
                <p>{remove.text} </p>
                <h4>Date</h4>
                <p>{remove.date.toString()} </p>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-danger btn-lg"
              onClick={() => this.setState({ displayRemoved: false })}
            >
              Ok
            </button>
          </Modal.Footer>
        </Modal>

        {this.renderReminders()}
      </div>
    );
  }
}

export default connect(
  (state) => {
    return { reminders: state };
  },
  { add_Reminder, rem_Reminder, clear_Reminders, complete_Reminder }
)(App);
