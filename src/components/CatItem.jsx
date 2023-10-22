import React, { useEffect, useState } from "react";
import CatModal from "./CatModal";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";

const CatItem = ({ item }) => {
  const [modalActive, setModalActive] = useState(false);
  let catLiClassName = item.super ? "cat__li-super" : "cat__li";
  const isCashbackEnd = item.end_date && new Date() > new Date(item.end_date);
  catLiClassName = isCashbackEnd ? `${catLiClassName} cat__ended` : catLiClassName

  // Disable scroll when modal is active
  useEffect(() => {
    if (modalActive) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalActive]);

  return (
    <>
      {item.percents.length > 1 ? (
        <>
          <div className={catLiClassName}>
            <img
              className="cat__icon"
              src={`icons/${item.category.icon}`}
              alt="Иконка категории"
            />
            <div className="cat__name">
              <span className="cat__perc">{`${item.percent}%`}</span>
              <span className="cat__desc">{item.category.name}</span>
            </div>
            <button className="cat__btn" onClick={() => setModalActive(true)}>
              Подробнее
            </button>
            <CatModal
              active={modalActive}
              setActive={setModalActive}
              category={item.category}
              percent={item.percent}
            />
          </div>
          <Accordion transition transitionTimeout={400}>
            <AccordionItem
              className="accordion"
              header={
                <svg
                  width="800px"
                  height="800px"
                  viewBox="0 -4.5 20 20"
                  version="1.1"
                >
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="Dribbble-Light-Preview"
                      transform="translate(-220.000000, -6684.000000)"
                    >
                      <g
                        id="icons"
                        transform="translate(56.000000, 160.000000)"
                      >
                        <path
                          d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583"
                          id="arrow_down-[#338]"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              }
            >
              <div className="cat__sublist">
                {item.percents.map((percent, index) => {
                  return (
                    <div className="cat__li cat__subli" key={index}>
                      <img
                        className="cat__icon"
                        src={`icons/${item.category.icon}`}
                        alt="Иконка категории"
                      />
                      <div className="cat__name">
                        <span className="cat__perc">{`${percent}%`}</span>
                        <span className="cat__desc">{item.category.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionItem>
          </Accordion>
        </>
      ) : (
        <div className={catLiClassName}>
          <img
            className="cat__icon"
            src={`icons/${item.category.icon}`}
            alt="Иконка категории"
          />
          <div className="cat__end">
            <div className="cat__name">
              <span className="cat__perc">{`${item.percent}%`}</span>
              <span className="cat__desc">{item.category.name}</span>
            </div>
            {
              isCashbackEnd === true &&
                <div className="cat__end-date">истек срок</div>
            }
          </div>
          <button className="cat__btn" onClick={() => setModalActive(true)}>
            Подробнее
          </button>
          <CatModal
            active={modalActive}
            setActive={setModalActive}
            category={item.category}
            percent={item.percent}
          />
        </div>
      )}
    </>
  );
};

export default CatItem;
