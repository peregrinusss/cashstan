import React, { useEffect, useState } from "react";
import CatModal from "./CatModal";

const CatItem = ({ item }) => {
  const [modalActive, setModalActive] = useState(false)
  const catLiClassName = item.super ? "cat__li-super" : "cat__li";

  useEffect(() => {
    const handleWindowWheel = (event) => {
      if (modalActive){
        event.preventDefault();
      }
    };
    
    window.addEventListener('wheel', handleWindowWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWindowWheel);
    };
  }, [modalActive]);

  useEffect(() => {
    if (modalActive){
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalActive]);

  return (
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
      <button
        className="cat__btn"
        onClick={() => setModalActive(true)}
      >
        Подробнее
      </button>
      <CatModal active={modalActive} setActive={setModalActive} desc={item.category.description} mcc={item.category.mcc} />
    </div>
  );
};

export default CatItem;
