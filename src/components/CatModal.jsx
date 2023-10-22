import React from "react";

const CatModal = ({ active, setActive, category, percent }) => {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close"
          aria-label="Закрыть модальное окно"
          onClick={() => setActive(false)}
        ></button>
        <div className="modal__content">
          <div className="modal__body">
            <h2 className="modal__name">
              <span>{percent}%</span> {category.name}
            </h2>

            {category.description &&
              <div className="modal__item">
                <h3 className="modal__title">Описание</h3>
                <div className="modal__desc">
                  <p>{category.description}</p>
                </div>
              </div>
            }
            {category.mcc &&
              <div className="modal__item">
                <h3 className="modal__title">MCC коды</h3>
                <div className="modal__desc">
                  <p>{category.mcc}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatModal;
