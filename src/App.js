import React, { useState } from "react";
import Calendar from "react-calendar";
import "./App.css";
import "react-calendar/dist/Calendar.css";
import MonthView from "react-calendar/dist/umd/MonthView";

function App() {
  const [date, setDate] = useState("");

  const onChange = (date) => setDate(date);

  return (
    <div className="calenderStyle" style={{ backgroundColor: "rgba(166, 171, 189, 0.25)"}}>
      <Calendar onChange={onChange} value={date} view="year" />
    </div>
  );
}

export default App;
