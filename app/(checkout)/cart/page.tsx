"use client";
import React from "react";
import { CartProduct } from "@/shared/components/cart-product";
import style from "./Cart.module.scss";
import ProtectedRoute from "@/shared/components/protected-route";
import { useQuery } from "@apollo/client";
import { GET_BASKET_FOR_USER } from "@/shared/query/basket";
import { GetBasketForUserData } from "@/@types/product";
import toast from "react-hot-toast";

export default function Cart() {
  const { loading, error, data, refetch } =
    useQuery<GetBasketForUserData>(GET_BASKET_FOR_USER);
  const totalSum = data?.basketForUser.productsInBasket.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.Product.price * currentValue.value,
    0
  );
  const makingOrder = () => {
    toast.success(
      `Вы оформили заказ на сумму ${totalSum?.toLocaleString("ru-RU")} `,
      { icon: "💰" }
    );
  };
  return (
    <ProtectedRoute>
      <section className={style.cart}>
        <div className={`container ${style.cart__container}`}>
          <h1 className={style.cart__heading}>Корзина</h1>
          {!loading && (
            <ul className={`list-reset ${style.cart__list}`}>
              {data?.basketForUser.productsInBasket
                .slice() // Делаем копию массива, чтобы не мутировать оригинальные данные
                .sort((a, b) => Number(a.product_id) - Number(b.product_id)) // Сортируем по product_id
                .map(({ product_id, Product, value }) => {
                  return (
                    <li key={product_id} className={style.cart__item}>
                      <CartProduct
                        Product={Product}
                        startValue={value}
                        refetch={() => {
                          refetch();
                        }}
                      />
                    </li>
                  );
                })}
            </ul>
          )}

          {data?.basketForUser.productsInBasket.length === 0 && (
            <h1
              style={{
                marginInline: "auto",
                width: "fit-content",
                padding: "3em 0",
              }}
            >
              нет товаров
            </h1>
          )}

          <div className={style.cart__result}>
            <button
              className={style.cart__button}
              onClick={() => {
                makingOrder();
              }}
            >
              Оформить заказ
            </button>
            <div className={style.cart__price}>
              <p>Сумма заказа:</p>
              <strong>
                <p className={style.cart__cost}>
                  {totalSum?.toLocaleString("ru-RU")}₽
                </p>
              </strong>
            </div>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
