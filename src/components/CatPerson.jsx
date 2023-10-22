import React from "react";
import CatItem from "./CatItem";

const CatPerson = ({ person, dataPerson }) => {
  const isSum = person === "unsorted";
  const catItemClassName = isSum ? "cat__sum" : "cat-item";

  const combinedCategories = {};

  dataPerson.cashbacks.forEach((cashback) => {
    const categoryName = cashback.category.name;

    if (!combinedCategories[categoryName]) {
      combinedCategories[categoryName] = {
        category: {
          name: categoryName,
          icon: [],
          description: [],
          mcc: [],
        },
        date: "",
        id: 0,
        percent: 0,
        percents: [],
        super: false,
      };
    }

    if (cashback.end_date) {
      combinedCategories[categoryName].end_date = cashback.end_date
    }
    combinedCategories[categoryName].category.icon = cashback.category.icon;
    combinedCategories[categoryName].category.description = cashback.category.description
    combinedCategories[categoryName].category.mcc = cashback.category.mcc;

    combinedCategories[categoryName].percent += cashback.percent;
    combinedCategories[categoryName].percents.push(cashback.percent);
    combinedCategories[categoryName].date = cashback.date;
    combinedCategories[categoryName].id = cashback.id;

    if (cashback.super) {
      combinedCategories[categoryName].super = true;
    }
  });

  const combinedCategoriesArray = Object.values(combinedCategories);

  combinedCategoriesArray.sort((a, b) =>
    a.super === b.super ? 0 : a.super ? 1 : -1
  );

  return (
    <div className={catItemClassName}>
      <div className="cat-item__hat">
        <h2 className="cat__person">{isSum ? "Общий за месяц" : person}</h2>
        <div className="cat__cards">
          {dataPerson.cards.length !== 0 &&
            Object.keys(dataPerson.cards).map((card) => (
              <div className="cat-card" key={card}>
                <div className="cat-card__type">
                  {card.startsWith("4")
                    ? "visa"
                    : card.startsWith("2")
                    ? "мир"
                    : "mc"}
                </div>
                <div className="cat-card__number">{card.slice(-4)}</div>
              </div>
            ))}
        </div>
      </div>

      <div className="cat__ul">
        {combinedCategoriesArray.map((item) => (
          <CatItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CatPerson;
