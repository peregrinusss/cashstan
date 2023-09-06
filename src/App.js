import React, { useEffect, useState, forwardRef, useMemo } from "react";
import AnimatedCursor from "react-animated-cursor";
import "react-datepicker/dist/react-datepicker.css";
import "./style/style.scss";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import CatItems from "./components/CatItems";
import { ru } from "date-fns/locale";
import CatFilter from "./components/CatFilter";

registerLocale("ru", ru);

function App() {
  const [cashbackData, setCashbackData] = useState({}); // cashback
  const [infoLoading, setInfoLoading] = useState(false); // cashback loading
  const [startDate, setStartDate] = useState(new Date()); // datepicker
  const [isEmpty, setIsEmpty] = useState(false); // is empty data
  const [filter, setFilter] = useState({ query: "" }); // filter cashback

  // -------------- functions ----------------
  const fetchCashback = async (url) => {
    setInfoLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setCashbackData(data);
      setIsEmpty(Object.keys(data).length === 0);
      setInfoLoading(false);
    } catch (error) {
      console.error("Произошла ошибка при выполнении запроса:", error);
      setIsEmpty(true);
      setInfoLoading(false);
    }
  };

  const generateUrl = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const apiUrl = `https://cashbacks.squidass.com/api/cashbacks/${year}.${month}`;

    return apiUrl;
  };

  const searchedCashback = useMemo(() => {
    return Object.keys(cashbackData).reduce((result, key) => {
      const filteredItems = cashbackData[key].filter((item) =>
        item.category.name.toLowerCase().includes(filter.query.toLowerCase())
      );
      if (filteredItems.length > 0) {
        result[key] = filteredItems;
        setIsEmpty(false);
      } else {
        setIsEmpty(true);
      }
      return result;
    }, {});
  }, [filter.query, cashbackData]);
  // -------------- /functions ----------------

  // set current month and data
  useEffect(() => {
    const dateNow = new Date();
    const apiUrl = generateUrl(dateNow);

    fetchCashback(apiUrl);
  }, []);

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
    <div className="cat">
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        hasBlendMode={true}
        innerStyle={{
          backgroundColor: "var(--cursor-color)",
        }}
        outerStyle={{
          border: "3px solid var(--cursor-color)",
        }}
      />
      <h1 className="cat__title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="48"
          viewBox="0 0 31 48"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.9423 20.1962H19.4573L15.3985 7.16384H15.2393L10.9423 20.1962ZM20.8882 4.75813L29.9221 32.254H23.2371L21.2077 25.7177H9.11194L6.92331 32.254H0.636719L10.1168 4.75813C11.0362 2.09147 12.1076 0 15.5578 0C19.0076 0 20.0146 2.09992 20.8882 4.75813Z"
            fill="#ffffff"
          />
          <path d="M0 41.0791V47.5751H30.6383V41.0791H0Z" fill="#EF3124" />
        </svg>
        cashbacks
      </h1>
      <DatePicker
        wrapperClassName="datepicker"
        selected={startDate}
        customInput={<ExampleCustomInput />}
        onChange={handleDateChange}
        dateFormat="MMM yyyy"
        showMonthYearPicker
        locale="ru"
      />
      <CatFilter filter={filter} setFilter={setFilter} />
      <CatItems
          data={searchedCashback}
          loading={infoLoading}
          isEmpty={isEmpty}
        />
    </div>
  );
}

export default App;
