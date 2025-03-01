"use client";
import React from "react";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";
import style from "./ProductsPage.module.scss";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ONE_PRODUCTS } from "@/shared/query/product";
import { GetProductResponse } from "@/@types/product";
import { ADD_PRODUCT_TO_BASKET } from "@/shared/query/add-basket";
import toast from "react-hot-toast";
import { useAuth } from "@/shared/services/auth-context";

interface ProductPageProps {
  productId: string;
}

export const ProductPage: React.FC<ProductPageProps> = ({ productId }) => {
  const { isAuthenticated } = useAuth();
  const { data, loading, error } = useQuery<GetProductResponse>(
    GET_ONE_PRODUCTS,
    {
      variables: { id: parseInt(productId as string, 10) },
      fetchPolicy: "cache-first",
    }
  );

  const [addToBasket] = useMutation(ADD_PRODUCT_TO_BASKET);

  const handleAddToBasket = async () => {
    if (isAuthenticated) {
      try {
        await addToBasket({
          variables: {
            addProductToBasketInput: {
              productId: parseInt(productId, 10),
            },
          },
        });
        toast.success("Товар добавлен в корзину!", { icon: "✅" });
      } catch (error) {
        toast.success("Ошибка добавления в корзину: " + error, { icon: "❌" });
      }
    } else toast.success("Авторизуйтесь перед покупкой! ", { icon: "❌" });
  };

  if (loading) {
    return (
      <section className={style.goods}>
        <div className={style.goods__swiper}>
          <div className={style.goods__wrapper}>
            <div
              className={`${style.goods__slide} ${style.goods__slide__activ}`}
            >
              <Skeleton
                className={style.goods__img}
                variant="rectangular"
                width={1090}
                height={368}
                style={{ borderRadius: "20px" }}
              />
            </div>
          </div>
        </div>
        <div className={style.goods__info}>
          <div className="container">
            <div className={style.goods__header}>
              <Skeleton
                className={style.goods__heading}
                variant="rectangular"
                width={280}
                height={48}
                style={{ borderRadius: "20px" }}
              />
              <div className={style.goods__price}>
                <Skeleton
                  variant="rectangular"
                  width={200}
                  height={48}
                  style={{ borderRadius: "20px" }}
                />
              </div>

              <Skeleton
                variant="rectangular"
                width={320}
                height={48}
                style={{ borderRadius: "20px" }}
              />
            </div>
            <div
              className={`${style.goods__specifications} ${style.specifications}`}
            >
              <ul className={`list-reset ${style.specifications__list}`}>
                <li className={style.specifications__item}>
                  <article className={style.specifications__field}>
                    <Skeleton
                      className={style.specifications__header}
                      variant="rectangular"
                      width={120}
                      height={48}
                      style={{ borderRadius: "20px" }}
                    />
                    <Skeleton
                      className={style.specifications__description}
                      variant="rectangular"
                      width={1600}
                      height={120}
                      style={{ borderRadius: "20px" }}
                    />
                  </article>
                </li>

                <li className={style.specifications__item}>
                  <article className={style.specifications__field}>
                    <Skeleton
                      className={style.specifications__header}
                      variant="rectangular"
                      width={120}
                      height={48}
                      style={{ borderRadius: "20px" }}
                    />
                    <Skeleton
                      className={style.specifications__description}
                      variant="rectangular"
                      width={80}
                      height={48}
                      style={{ borderRadius: "20px" }}
                    />
                  </article>
                </li>

                <li className={style.specifications__item}>
                  <article className={style.specifications__field}>
                    <Skeleton
                      className={style.specifications__header}
                      variant="rectangular"
                      width={120}
                      height={48}
                      style={{ borderRadius: "20px" }}
                    />
                    <Skeleton
                      className={style.specifications__description}
                      variant="rectangular"
                      width={80}
                      height={48}
                      style={{ borderRadius: "20px" }}
                    />
                  </article>
                </li>

                <li className={style.specifications__item}>
                  <article className={style.specifications__field}>
                    <Skeleton
                      className={style.specifications__header}
                      variant="rectangular"
                      width={120}
                      height={48}
                      style={{ borderRadius: "20px" }}
                    />
                    <Skeleton
                      className={style.specifications__description}
                      variant="rectangular"
                      width={80}
                      height={48}
                      style={{ borderRadius: "20px" }}
                    />
                  </article>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

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

            <button onClick={handleAddToBasket} className={style.goods__button}>
              Добавить в корзину
            </button>
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
                      Длина ствола
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
