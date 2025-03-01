import { Product } from "@/@types/product";
import Image from "next/image";
import React from "react";
import style from "./Cart.module.scss";
import { useMutation } from "@apollo/client";
import { UPDATE_BASKET_ITEM } from "@/shared/query/change-product-value";
import { REMOVE_PRODUCT_FROM_BASKET } from "@/shared/query/del-product-bucet";

interface cartProps {
  Product: Product;
  startValue: number;
  refetch: () => void;
}
export const CartProduct = ({ Product, startValue, refetch }: cartProps) => {
  const [value, setValue] = React.useState(startValue);

  const [updateBasketItem] = useMutation(UPDATE_BASKET_ITEM);
  const [removeProductFromBasket] = useMutation(REMOVE_PRODUCT_FROM_BASKET);

  // Обработчик уменьшения количества товара
  const handleDecrease = async () => {
    if (value > 1) {
      const newValue = value - 1;
      setValue(newValue);

      // Вызываем мутацию для обновления количества на сервере
      await updateBasketItem({
        variables: {
          updateBasketInput: {
            product_id: Product.id, // ID товара
            value: newValue, // Новое количество
          },
        },
      });

      // Обновляем данные корзины
      refetch();
    }
  };

  // Обработчик увеличения количества товара
  const handleIncrease = async () => {
    const newValue = value + 1;
    setValue(newValue);

    // Вызываем мутацию для обновления количества на сервере
    await updateBasketItem({
      variables: {
        updateBasketInput: {
          product_id: Product.id, // ID товара
          value: newValue, // Новое количество
        },
      },
    });

    // Обновляем данные корзины
    refetch();
  };

  // Обработчик удаления товара из корзины
  const handleRemove = async () => {
    // Вызываем мутацию для удаления товара
    await removeProductFromBasket({
      variables: {
        product_id: Product.id, // ID товара
      },
    });

    // Обновляем данные корзины
    refetch();
  };

  return (
    <article className={style.card}>
      <div className={style.card__left}>
        <div className={style.card__info}>
          <h3 className={style.card__heading}>{Product.title} </h3>
          <p className={style.card__description}>{Product.caliber}</p>
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
          <button
            disabled={value == 1}
            className={style.card__btn}
            onClick={handleDecrease}
          >
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
          <button className={style.card__btn} onClick={handleIncrease}>
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
              {(Product.price * value)?.toLocaleString("ru-RU")} ₽
            </p>
          </strong>
        </div>
        <button
          className={`${style.card__btn} ${style.card__btn__tr}`}
          onClick={handleRemove}
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
  );
};
