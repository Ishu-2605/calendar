import React, { Component } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "./App.css";
import "react-calendar/dist/Calendar.css";
import MonthView from "react-calendar/dist/umd/MonthView";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      showCalendar: false,
      presentMonth: new Date(),
    };
  }

  onChange = (date) => {
    console.log("reached");
    console.log(date);
    this.setState({
      date,
    });
  };

  OnMonthClick = () => {
    this.setState({
      showCalendar: !this.state.showCalendar,
    });
  };

  onBackClick = () => {
    this.setState(
      {
        presentMonth: moment(this.state.presentMonth).subtract(1, "months"),
      },
      () => {
        this.setState({
          date: moment(this.state.presentMonth).toDate(),
        });
      }
    );
  };

  onForwardClick = () => {
    this.setState(
      {
        presentMonth: moment(this.state.presentMonth).add(1, "months"),
      },
      () => {
        this.setState({
          date: moment(this.state.presentMonth).toDate(),
        });
      }
    );
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button onClick={this.onBackClick}>backward</button>
        <i className="fas fa-chevron-left"></i>
        <button onClick={this.OnMonthClick}>{`${moment(
          this.state.presentMonth,
          "M"
        ).format("MMMM")} ${moment(this.state.presentMonth).format(
          "YYYY"
        )}`}</button>
        <button onClick={this.onForwardClick}>forward</button>
        {this.state.showCalendar && (
          <div
            className="calenderStyle"
            style={{ backgroundColor: "rgba(166, 171, 189, 0.25)" }}
          >
            <Calendar
              onClickMonth={this.onChange}
              value={this.state.date}
              view="year"
              formatMonth={(locale, date) =>
                moment(date).format("MMMM").slice(0, 3)
              }
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
