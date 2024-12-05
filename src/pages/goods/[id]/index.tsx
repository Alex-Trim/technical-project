import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ONE_PRODUCTS } from "@/query/product";
import { ADD_PRODUCT_TO_BASKET } from "@/query/addBasket";
import { useAuth } from "@/components/AuthProvider/AuthProvider";

import style from "@/styles/Goods.module.scss";

interface Document {
  name: string;
}

interface ProductDocument {
  Document: Document;
}

interface Product {
  id: string;
  title: string;
  caliber: string;
  price: number;
  description: string;
  magazine: number;
  article: string;
  barrel_length: number;
  Category: {
    title: string;
  };
  ProductDocument: ProductDocument[];
}

interface GetProductResponse {
  product: Product;
}

export const Goods = () => {
  const { isAuth } = useAuth();

  const router = useRouter();
  const { id } = router.query;

  const [
    addProductToBasket,
    {
      data: dataProductToBasket,
      loading: loadingProductToBasket,
      error: errorProductToBasket,
    },
  ] = useMutation(ADD_PRODUCT_TO_BASKET);

  const { data, loading, error } = useQuery<GetProductResponse>(
    GET_ONE_PRODUCTS,
    {
      variables: { id: id ? parseInt(id as string, 10) : null },
    }
  );

  const handleAddToBasket = () => {
    const input = {
      productId: Number(id),
    };

    addProductToBasket({ variables: { addProductToBasketInput: input } })
      .then((response) => {
        console.log(
          "Product added to basket:",
          response.data.addProductToBasket
        );
      })
      .catch((err) => {
        console.error("Error adding product to basket:", err);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <section className={style.goods}>
      <div className={style.goods__swiper}>
        <div className={style.goods__wrapper}>
          <div className={`${style.goods__slide} ${style.goods__slide__activ}`}>
            <Image
              className={style.goods__img}
              width="1090"
              height="368"
              src={`https://trainess-api.dev-vt2b.ru/static/${data?.product.ProductDocument[0].Document.name}`}
              alt="товар"
            />
          </div>
        </div>
      </div>
      <div className={style.goods__info}>
        <div className="container">
          <div className={style.goods__header}>
            <h2 className={style.goods__heading}>{data?.product.title}</h2>
            <div className={style.goods__price}>
              <strong>
                <p className={style.goods__cost}>{data?.product.price} ₽</p>
              </strong>
            </div>
            {isAuth ? (
              <button
                onClick={handleAddToBasket}
                className={style.goods__button}
              >
                Добавить в корзину
              </button>
            ) : (
              <Link className={style.goods__button} href="/login">
                Добавить в корзину
              </Link>
            )}
          </div>
          <div
            className={`${style.goods__specifications} ${style.specifications}`}
          >
            <ul className={`list-reset ${style.specifications__list}`}>
              {data?.product.description && (
                <li className={style.specifications__item}>
                  <article className={style.specifications__field}>
                    <h3 className={style.specifications__header}>Описание</h3>
                    <p className={style.specifications__description}>
                      {data?.product.description}
                    </p>
                  </article>
                </li>
              )}
              {data?.product.magazine && (
                <li className={style.specifications__item}>
                  <article className={style.specifications__field}>
                    <h3 className={style.specifications__header}>Магазин</h3>
                    <p className={style.specifications__description}>
                      {data?.product.magazine}
                    </p>
                  </article>
                </li>
              )}
              {data?.product.caliber && (
                <li className={style.specifications__item}>
                  <article className={style.specifications__field}>
                    <h3 className={style.specifications__header}>Калибр</h3>
                    <p className={style.specifications__description}>
                      {data?.product.caliber}
                    </p>
                  </article>
                </li>
              )}
              {data?.product.barrel_length && (
                <li className={style.specifications__item}>
                  <article className={style.specifications__field}>
                    <h3 className={style.specifications__header}>
                      Длинна ствола
                    </h3>
                    <p className={style.specifications__description}>
                      {data?.product.barrel_length} мм
                    </p>
                  </article>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Goods;
