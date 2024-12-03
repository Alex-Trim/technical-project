import React from "react";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useQuery } from "@apollo/client";
import { GET_BASKET_FOR_USER } from "@/query/getBasket";

import testImg from "../../../public/goods/saiga-5.png";
import style from "@/styles/Cart.module.scss";

// Интерфейс для документа
interface Document {
  name: string;
}

// Интерфейс для продукта
interface ProductDocument {
  Document: Document;
}
// Интерфейс для информации о продукте в корзине
interface Product {
  id: string; // Идентификатор продукта
  title: string; // Название продукта
  price: number; // Цена продукта
  caliber: string;
  ProductDocument: ProductDocument[];
}

// Интерфейс для информации о корзине
interface Basket {
  id: string; // Идентификатор корзины
}

// Интерфейс для элемента в корзине
interface ProductsInBasket {
  basket_id: string; // Идентификатор корзины
  product_id: string; // Идентификатор продукта
  value: number; // Количество продукта в корзине
  created_at: string; // Дата создания
  updated_at: string; // Дата обновления
  deleted_at?: string | null; // Дата удаления (может быть null)
  Basket: Basket; // Информация о корзине
  Product: Product; // Информация о продукте
}

// Интерфейс для ответа на запрос basketForUser
interface FindAllProductsInBasketOutput {
  productsInBasket: ProductsInBasket[]; // Массив продуктов в корзине
  totalCount: number; // Общее количество продуктов в корзине
}
interface GetBasketForUserData {
  basketForUser: FindAllProductsInBasketOutput; // Данные о корзине пользователя
}

export const Cart = () => {
  const { loading, error, data } = useQuery<GetBasketForUserData>(
    GET_BASKET_FOR_USER,
    {
      variables: { skip: 0, take: 5 },
    }
  );

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <ProtectedRoute>
      <section className={style.cart}>
        <div className={`container ${style.cart__container}`}>
          <h1 className={style.cart__heading}>Корзина</h1>
          <ul className={`list-reset ${style.cart__list}`}>
            {data?.basketForUser.productsInBasket.map(
              ({ product_id, Product, value }) => {
                return (
                  <li key={product_id} className={style.cart__item}>
                    <article className={style.card}>
                      <div className={style.card__left}>
                        <div className={style.card__info}>
                          <h3 className={style.card__heading}>
                            {Product.title}{" "}
                          </h3>
                          <p className={style.card__description}>
                            {Product.caliber}
                          </p>
                        </div>
                        <div className={style.card__picture}>
                          <Image
                            width="398"
                            height="134"
                            className={style.card__img}
                            src={`https://trainess-api.dev-vt2b.ru/static/${Product.ProductDocument[0].Document.name}`}
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
                          <p>{value}</p>
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
                            <p className={style.card__cost}>
                              {Product.price} ₽
                            </p>
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
                );
              }
            )}
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
    </ProtectedRoute>
  );
};
export default Cart;
