import React from "react";

const CatModal = ({ active, setActive, desc, mcc }) => {
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
              <span>1%</span> На все покупки
            </h2>

            {desc &&
              <div className="modal__item">
                <h3 className="modal__title">Описание</h3>
                <div className="modal__desc">
                  <p>{desc}</p>
                </div>
              </div>
            }
            {mcc &&
              <div className="modal__item">
                <h3 className="modal__title">MCC коды</h3>
                <div className="modal__desc">
                  <p>{mcc}</p>
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
