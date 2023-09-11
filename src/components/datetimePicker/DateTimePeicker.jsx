import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useRecoilValue } from "recoil";
import { datePickerSate } from "../../state/datePickerState";

export default function DateTimePeicker({ dateTimeData, dateTimeChange }) {
  const dateTimeReadOnlyState = useRecoilValue(datePickerSate);
  const DateFicker = () => {
    return (
      <DatePicker
        selected={dateTimeData}
        onChange={(date) => dateTimeChange(date)}
        timeInputLabel="Time:"
        dateFormat="yyyy/MM/dd h:mm aa"
        showTimeInput
        className="datePicker"
        readOnly={dateTimeReadOnlyState ? true : false}
        placeholderText="결혼식 날짜를 저장해주세요."
      />
    );
  };

  return <DateFicker />;
}
