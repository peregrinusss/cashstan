import { useEffect, useState, useMemo } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style/style.scss";
import CatItems from "./components/CatItems";
import CatFilter from "./components/CatFilter";

function App() {
  const [cashbackData, setCashbackData] = useState({}); // cashback
  const [infoLoading, setInfoLoading] = useState(false); // cashback loading
  const [isEmpty, setIsEmpty] = useState(false); // is empty data
  const [filter, setFilter] = useState({ query: "" }); // filter cashback

  // -------------- functions ----------------
  const fetchCashback = async (url) => {
    setInfoLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCashbackData(data);
      console.log(data)
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
    const result = {};

    Object.keys(cashbackData).forEach((key) => {
      const cashbackList = cashbackData[key].cashbacks;

      const filteredItems = cashbackList.filter((item) => {
        const lowercaseQuery = filter.query.toLowerCase();
        const categoryData = item.category.name.toLowerCase();

        return categoryData.includes(lowercaseQuery);
      });

      if (filteredItems.length > 0) {
        result[key] = {
          cashbacks: filteredItems,
          cards: cashbackData[key].cards || [],
        };
      }
    });

    setIsEmpty(Object.keys(result).length === 0);

    return result;
  }, [filter.query, cashbackData]);

  // -------------- /functions ----------------

  // set current month and data
  useEffect(() => {
    const dateNow = new Date();
    const apiUrl = generateUrl(dateNow);

    fetchCashback(apiUrl);
  }, []);

  return (
    <div className="cat">
      <div id="bg-wrap">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient
              id="Gradient1"
              cx="50%"
              cy="50%"
              fx="0.441602%"
              fy="50%"
              r=".5"
            >
              <animate
                attributeName="fx"
                dur="190.4s"
                values="0%;3%;0%"
                repeatCount="indefinite"
              ></animate>
              <stop offset="0%" stopColor="rgba(255, 0, 255, 1)"></stop>
              <stop offset="100%" stopColor="rgba(255, 0, 255, 0)"></stop>
            </radialGradient>
            <radialGradient
              id="Gradient2"
              cx="50%"
              cy="50%"
              fx="2.68147%"
              fy="50%"
              r=".5"
            >
              <animate
                attributeName="fx"
                dur="134s"
                values="0%;3%;0%"
                repeatCount="indefinite"
              ></animate>
              <stop offset="0%" stopColor="rgba(255, 255, 0, 1)"></stop>
              <stop offset="100%" stopColor="rgba(255, 255, 0, 0)"></stop>
            </radialGradient>
            <radialGradient
              id="Gradient3"
              cx="50%"
              cy="50%"
              fx="0.836536%"
              fy="50%"
              r=".5"
            >
              <animate
                attributeName="fx"
                dur="121.6s"
                values="0%;3%;0%"
                repeatCount="indefinite"
              ></animate>
              <stop offset="0%" stopColor="rgba(0, 255, 255, 1)"></stop>
              <stop offset="100%" stopColor="rgba(0, 255, 255, 0)"></stop>
            </radialGradient>
            <radialGradient
              id="Gradient4"
              cx="50%"
              cy="50%"
              fx="4.56417%"
              fy="50%"
              r=".5"
            >
              <animate
                attributeName="fx"
                dur="128.8s"
                values="0%;5%;0%"
                repeatCount="indefinite"
              ></animate>
              <stop offset="0%" stopColor="rgba(0, 255, 0, 1)"></stop>
              <stop offset="100%" stopColor="rgba(0, 255, 0, 0)"></stop>
            </radialGradient>
            <radialGradient
              id="Gradient5"
              cx="50%"
              cy="50%"
              fx="2.65405%"
              fy="50%"
              r=".5"
            >
              <animate
                attributeName="fx"
                dur="137.2s"
                values="0%;5%;0%"
                repeatCount="indefinite"
              ></animate>
              <stop offset="0%" stopColor="rgba(0,0,255, 1)"></stop>
              <stop offset="100%" stopColor="rgba(0,0,255, 0)"></stop>
            </radialGradient>
            <radialGradient
              id="Gradient6"
              cx="50%"
              cy="50%"
              fx="0.981338%"
              fy="50%"
              r=".5"
            >
              <animate
                attributeName="fx"
                dur="142.8s"
                values="0%;5%;0%"
                repeatCount="indefinite"
              ></animate>
              <stop offset="0%" stopColor="rgba(255,0,0, 1)"></stop>
              <stop offset="100%" stopColor="rgba(255,0,0, 0)"></stop>
            </radialGradient>
          </defs>

          <rect
            x="13.744%"
            y="1.18473%"
            width="100%"
            height="100%"
            fill="url(#Gradient1)"
            transform="rotate(334.41 50 50)"
          >
            <animate
              attributeName="x"
              dur="100.8s"
              values="25%;0%;25%"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="y"
              dur="117.6s"
              values="0%;25%;0%"
              repeatCount="indefinite"
            ></animate>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="39.2s"
              repeatCount="indefinite"
            ></animateTransform>
          </rect>
          <rect
            x="-2.17916%"
            y="35.4267%"
            width="100%"
            height="100%"
            fill="url(#Gradient2)"
            transform="rotate(255.072 50 50)"
          >
            <animate
              attributeName="x"
              dur="128.8s"
              values="-25%;0%;-25%"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="y"
              dur="142.4s"
              values="0%;50%;0%"
              repeatCount="indefinite"
            ></animate>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="57.6s"
              repeatCount="indefinite"
            ></animateTransform>
          </rect>
          <rect
            x="9.00483%"
            y="14.5733%"
            width="100%"
            height="100%"
            fill="url(#Gradient3)"
            transform="rotate(139.903 50 50)"
          >
            <animate
              attributeName="x"
              dur="140s"
              values="0%;25%;0%"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="y"
              dur="67.2s"
              values="0%;25%;0%"
              repeatCount="indefinite"
            ></animate>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360 50 50"
              to="0 50 50"
              dur="43.2s"
              repeatCount="indefinite"
            ></animateTransform>
          </rect>
        </svg>
      </div>

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
      <CatFilter filter={filter} setFilter={setFilter} generateUrl={generateUrl} fetchCashback={fetchCashback} />
      <CatItems
        data={searchedCashback}
        loading={infoLoading}
        isEmpty={isEmpty}
      />
    </div>
  );
}

export default App;
