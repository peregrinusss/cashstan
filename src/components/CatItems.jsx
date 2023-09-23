import React from "react";
import CatPerson from "./CatPerson";

const CatItems = ({ data, loading, isEmpty}) => {
  return (
    <div className="cat__items">
      {loading ? (
        <div className="lds-ellipsis spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : isEmpty ? (
        <h2 className="cat__no">Кэшбэк не найден</h2>
      ) : (
        Object.keys(data).map((person) => (
          <CatPerson key={person} person={person} dataPerson={data[person]} />
        ))
      )}
    </div>
  );
};

export default CatItems;
