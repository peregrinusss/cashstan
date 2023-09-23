import React, { forwardRef, useState } from 'react'
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale";

registerLocale("ru", ru);

const CatFilter = ({filter, setFilter, generateUrl, fetchCashback}) => {
  const [startDate, setStartDate] = useState(new Date()); // datepicker

  // custom input datepicker
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="cat__btn cat__date" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  // change data listener for datepicker
  const handleDateChange = (date) => {
    setStartDate(date);
    const apiUrl = generateUrl(date);
    fetchCashback(apiUrl);
  };

  return (
    <div className='cat__filter'>
      <div className="cat__datepicker">
        <DatePicker
          wrapperClassName="datepicker"
          selected={startDate}
          customInput={<ExampleCustomInput />}
          onChange={handleDateChange}
          dateFormat="MMM yyyy"
          showMonthYearPicker
          locale="ru"
        />
      </div>
      <div className='cat__btn cat__search'>
        <input type="text" name="search" placeholder="Поиск..." value={filter.query} onChange={e => setFilter({...filter, query: e.target.value})}/>
      </div>
    </div>
  )
}

export default CatFilter