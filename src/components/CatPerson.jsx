import React, { useEffect } from "react";
import CatItem from "./CatItem";

const CatPerson = ({ person, dataPerson }) => {
  const isSum = person === "unsorted";
  const catItemClassName = isSum ? "cat__sum" : "cat-item";

  return (
    <div className={catItemClassName}>
      <div className="cat-item__hat">
        <h2 className="cat__person">{isSum ? "Общий за месяц" : person}</h2>
        <div className="cat__cards">
        {dataPerson.cards.length !== 0 && 
          dataPerson.cards.map(card => (
          <div className="cat-card" key={card}>
            <div className="cat-card__type">{card.startsWith('4') ? 'visa' : card.startsWith('2') ? 'мир' : 'mc'}</div>
            <div className="cat-card__number">{card.slice(-4)}</div>
          </div>
          ))
        }
      </div>
      </div>

      <div className="cat__ul">
        {dataPerson.cashbacks.map((item) => (
          <CatItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CatPerson;
