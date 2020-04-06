import React, { useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import MonthView from "react-calendar/dist/umd/MonthView";

function App() {
  const [date, setDate] = useState("");

  const onChange = (date) => setDate(date);

  return (
    <div>
      <Calendar onChange={onChange} value={date} view="year" />
    </div>
  );
}

export default App;
