import React from "react";
import CatItem from "./CatItem";

const CatPerson = ({ person, data }) => {
  const isSum = person === "unsorted";
  const catItemClassName = isSum ? "cat__sum" : "cat__item";

  return (
    <div className={catItemClassName}>
      <h2 className="cat__person">{isSum ? "Общий за месяц" : person}</h2>
      <div className="cat__ul">
        {data.map((item) => (
          <CatItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CatPerson;
