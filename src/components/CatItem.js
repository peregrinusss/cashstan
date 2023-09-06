import React from "react";

const CatItem = ({ item }) => {
  const catLiClassName = item.super ? "cat__li-super" : "cat__li";

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
        className="btn-reset modal-btn cat__btn"
        data-graph-animation="custom"
        data-graph-path="info"
        data-graph-speed="500"
      >
        Подробнее
      </button>
    </div>
  );
};

export default CatItem;
