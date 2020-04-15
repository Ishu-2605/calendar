import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";

import FacilityCalendar from "./components/FacilityCalendar";

import "./App.css";
import "react-calendar/dist/Calendar.css";

import LeftArrow from "./ic-left.svg";
import RightArrow from "./ic-right.svg";
import DownArrow from "./ic-down.svg";
import NewCalendar from "./components/NewCalendar";

const App = () => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [presentMonth, setPresentMonth] = useState(new Date());

  const onChange = (date) => {
    console.log("reached");
    console.log(date);
    setDate(date);
  };

  const OnMonthClick = () => {
    setShowCalendar((showCalendar) => !showCalendar);
  };

  const onBackClick = () => {
    setDate(moment(date).subtract(1, "months").toDate());
  };

  const onForwardClick = () => {
    setDate(moment(date).add(1, "months").toDate());
  };

  // useEffect(() => {
  //   setDate(moment(date).toDate());
  // }, [date]);
  console.log(date);
  return (
    <div>
      <p className="monthtxt">Select month to see bookings</p>
      <div className="center-calendar">
        <img
          src={LeftArrow}
          className="arrowpdg"
          onClick={onBackClick}
          alt="not loaded"
        />
        <div className="currentmonthselect" onClick={OnMonthClick}>
          {`${moment(date, "M").format("MMMM")} ${moment(date).format("YYYY")}`}{" "}
          <img src={DownArrow} className="" alt="not loaded" />
        </div>
        <img
          src={RightArrow}
          className="arrowpdg"
          onClick={onForwardClick}
          alt="not loaded"
        />
      </div>
      {showCalendar && (
        <div className="center-calendar">
          <Calendar
            onClickMonth={onChange}
            value={date}
            view="year"
            formatMonth={(locale, date) =>
              moment(date).format("MMMM").slice(0, 3)
            }
          />
        </div>
      )}
      <div className="center-calendar">
        <FacilityCalendar />
        {/* <NewCalendar /> */}
      </div>
    </div>
  );
};

export default App;
