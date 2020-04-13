import React, { Component, useState } from "react";
import moment from "moment";
// import {
//   DateRangePicker,
//   SingleDatePicker,
//   DayPickerRangeController,
// } from "react-dates";
// import { DateRangePicker } from "react-date-range";
// import "react-date-range/dist/styles.css"; // main style file
// import "react-date-range/dist/theme/default.css"; // theme css file

// export default class FacilityCalendar extends Component {
//   handleSelect(date) {
//     console.log(date); // native Date object
//   }
//   render() {
//     return <DateRangePicker date={new Date()} onChange={this.handleSelect} />;
//   }
// }

// import { addDays } from "date-fns";
// import { useState } from "react";

// const FacilityCalendar = () => {
//   const [state, setState] = useState([
//     {
//       startDate: new Date(),
//       endDate: addDays(new Date(), 7),
//       key: "selection",
//     },
//   ]);

//   return (
//     <DateRangePicker
//       onChange={(item) => setState([item.selection])}
//       showMonthAndYearPickers={false}
//       showSelectionPreview={false}
//       showCustomRangeLabel={false}
//       showMonthAndYearPickers={false}
//       moveRangeOnFirstSelection={false}
//       months={2}
//       ranges={state}
//       direction="horizontal"
//     />
//   );
// };

// export default FacilityCalendar;

// const FacilityCalendar = () => {
//   return <DateRangePicker />;
// };

// export default FacilityCalendar;

import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

export default function DatePicker({ date, onChange }) {
  const [focused, setFocused] = useState(false);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(15, "days"));

  const CustomArrow = () => {
    return <div>To</div>;
  };

  const handleDateChange = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleOutsideRange = () => {
    console.log("outside range");
  };

  return (
    <div>
      <DateRangePicker
        numberOfMonths={2}
        showDefaultInputIcon={false}
        startDate={startDate}
        endDate={endDate}
        onDatesChange={({ startDate, endDate }) =>
          handleDateChange(startDate, endDate)
        }
        focusedInput={focused}
        keepOpenOnDateSelect={true}
        onFocusChange={(focusedInput) => setFocused(focusedInput)}
        displayFormat={"MMM D"}
      />
    </div>
  );
}
