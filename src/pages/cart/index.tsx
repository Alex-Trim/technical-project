import React from "react";
import Image from "next/image";

import testImg from "../../../public/goods/saiga-5.png";
import style from "@/styles/Cart.module.scss";

export const Cart = () => {
  return (
    <main>
      <section className={style.cart}>
        <div className={`container ${style.cart__container}`}>
          <h1 className={style.cart__heading}>Корзина</h1>
          <ul className={`list-reset ${style.cart__list}`}>
            <li className={style.cart__item}>
              <article className={style.card}>
                <div className={style.card__left}>
                  <div className={style.card__info}>
                    <h3 className={style.card__heading}>Сайга-ППК </h3>
                    <p className={style.card__description}>9x19, 415 мм</p>
                  </div>
                  <div className={style.card__picture}>
                    <Image
                      className={style.card__img}
                      src={testImg}
                      alt="продукт"
                    />
                  </div>
                </div>
                <div className={style.card__right}>
                  <div className={style.card__quantity}>
                    <button className={style.card__btn}>
                      <span>
                        <svg
                          width="20"
                          height="4"
                          viewBox="0 0 20 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.3334 3.33341H0.666748V0.666748H19.3334V3.33341Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </button>
                    <p>8</p>
                    <button className={style.card__btn}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.3334 11.3334H11.3334V19.3334H8.66675V11.3334H0.666748V8.66675H8.66675V0.666748H11.3334V8.66675H19.3334V11.3334Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className={style.card__price}>
                    <strong>
                      <p className={style.card__cost}>104 649 ₽</p>
                    </strong>
                  </div>
                  <button
                    className={`${style.card__btn} ${style.card__btn__tr}`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.9166 2.08075L17.9191 0.083252L9.99992 8.00242L2.08075 0.083252L0.083252 2.08075L8.00242 9.99992L0.083252 17.9191L2.08075 19.9166L9.99992 11.9974L17.9191 19.9166L19.9166 17.9191L11.9974 9.99992L19.9166 2.08075Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </article>
            </li>
            <li className={style.cart__item}>
              <article className={style.card}>
                <div className={style.card__left}>
                  <div className={style.card__info}>
                    <h3 className={style.card__heading}>Сайга-ППК </h3>
                    <p className={style.card__description}>9x19, 415 мм</p>
                  </div>
                  <div className={style.card__picture}>
                    <Image
                      className={style.card__img}
                      src={testImg}
                      alt="продукт"
                    />
                  </div>
                </div>
                <div className={style.card__right}>
                  <div className={style.card__quantity}>
                    <button className={style.card__btn}>
                      <span>
                        <svg
                          width="20"
                          height="4"
                          viewBox="0 0 20 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.3334 3.33341H0.666748V0.666748H19.3334V3.33341Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </button>
                    <p>8</p>
                    <button className={style.card__btn}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.3334 11.3334H11.3334V19.3334H8.66675V11.3334H0.666748V8.66675H8.66675V0.666748H11.3334V8.66675H19.3334V11.3334Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className={style.card__price}>
                    <strong>
                      <p className={style.card__cost}>104 649 ₽</p>
                    </strong>
                  </div>
                  <button
                    className={`${style.card__btn} ${style.card__btn__tr}`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.9166 2.08075L17.9191 0.083252L9.99992 8.00242L2.08075 0.083252L0.083252 2.08075L8.00242 9.99992L0.083252 17.9191L2.08075 19.9166L9.99992 11.9974L17.9191 19.9166L19.9166 17.9191L11.9974 9.99992L19.9166 2.08075Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </article>
            </li>
          </ul>
          <div className={style.cart__result}>
            <button className={style.cart__button}>Оформить заказ</button>
            <div className={style.cart__price}>
              <p>Сумма заказа:</p>
              <strong>
                <p className={style.cart__cost}>104 649 ₽</p>
              </strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Cart;
