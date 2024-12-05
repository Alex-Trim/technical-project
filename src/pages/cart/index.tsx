import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BASKET_FOR_USER } from "@/query/getBasket";
import CartProduct from "@/components/CartProduct";
import ProtectedRoute from "@/components/ProtectedRoute";

import style from "@/styles/Cart.module.scss";

interface Document {
  name: string;
}

interface ProductDocument {
  Document: Document;
}

interface Product {
  id: string;
  title: string;
  price: number;
  caliber: string;
  ProductDocument: ProductDocument[];
}

interface Basket {
  id: string;
}

interface ProductsInBasket {
  basket_id: string;
  product_id: string;
  value: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  Basket: Basket;
  Product: Product;
}

interface FindAllProductsInBasketOutput {
  productsInBasket: ProductsInBasket[];
  totalCount: number;
}
interface GetBasketForUserData {
  basketForUser: FindAllProductsInBasketOutput;
}

export const Cart = () => {
  const { loading, error, data, refetch } =
    useQuery<GetBasketForUserData>(GET_BASKET_FOR_USER);
  const [totalPrice, setTotalPrice] = React.useState(0);
  React.useEffect(() => {
    let sum = 0;
    data?.basketForUser.productsInBasket.forEach(({ Product, value }) => {
      const square = value * Product.price;
      sum += square;
    });
    setTotalPrice(sum);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  refetch();
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
                    <CartProduct
                      Product={Product}
                      startValue={value}
                      refetch={() => {
                        refetch();
                      }}
                    />
                  </li>
                );
              }
            )}
          </ul>
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
              disabled={data?.basketForUser.productsInBasket.length === 0}
              className={style.cart__button}
              onClick={() => {
                alert(`Вы оформили заказ на сумму ${totalPrice}`);
              }}
            >
              Оформить заказ
            </button>
            <div className={style.cart__price}>
              <p>Сумма заказа:</p>
              <strong>
                <p className={style.cart__cost}>{totalPrice} ₽</p>
              </strong>
            </div>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
};
export default Cart;
