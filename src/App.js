import React, { Component } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "./App.css";
import "react-calendar/dist/Calendar.css";
import MonthView from "react-calendar/dist/umd/MonthView";
import LeftArrow from "./ic-left.svg";
import RightArrow from "./ic-right.svg";
import DownArrow from "./ic-down.svg";

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
      <div>
        <p className="monthtxt">Select month to see bookings</p>
        <div className="center-calendar">          
          <img src={LeftArrow} className="arrowpdg" onClick={this.onBackClick} />
          <div className="currentmonthselect" onClick={this.OnMonthClick}>{`${moment(
            this.state.presentMonth,
            "M"
          ).format("MMMM")} ${moment(this.state.presentMonth).format(
            "YYYY"
          )}`}  <img src={DownArrow} className=""/></div>
          <img src={RightArrow} className="arrowpdg" onClick={this.onForwardClick} />
        </div>
        {this.state.showCalendar && (
          <div className="center-calendar">
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
