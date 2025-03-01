"use client";
import React from "react";
import Image from "next/image";
import style from "./MainOffer.module.scss";

import { useQuery } from "@apollo/client";
import { GetMainOffer } from "@/@types/product";
import { GET_MAIN_OFFER } from "@/shared/query/main-offer";
import Skeleton from "@mui/material/Skeleton";

export const MainOffer = () => {
  const {
    data: offer,
    loading: offerLoading,
    error: offerError,
  } = useQuery<GetMainOffer>(GET_MAIN_OFFER);

  if (offerError) return <p>Ошибка: {offerError.message}</p>;

  if (offerLoading) {
    return (
      <section className={style.hero}>
        <div className={` ${style.hero__container}`}>
          <article className={style.mainOffer}>
            <div className={style.mainOffer__price}>
              <Skeleton
                variant="rectangular"
                width={235}
                height={55}
                style={{ borderRadius: "20px" }}
              />
            </div>
            <div className={style.mainOffer__picture}>
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={460}
                style={{ borderRadius: "20px" }}
              />
            </div>
            <div className={style.mainOffer__info}>
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={110}
                style={{ borderRadius: "20px" }}
              />
            </div>
          </article>
        </div>
      </section>
    );
  }

  if (!offer?.product) return <p>Нет данных</p>;

  const productImage = offer.product.ProductDocument?.[0]?.Document?.name;

  return (
    <section className={style.hero}>
      <div className={`container ${style.hero__container}`}>
        <article className={style.mainOffer}>
          <div className={style.mainOffer__price}>
            <span>от </span>
            <strong>
              <span className={style.mainOffer__cost}>
                {offer.product.price}
              </span>
              <span>₽</span>
            </strong>
          </div>
          <div className={style.mainOffer__picture}>
            {productImage ? (
              <Image
                className={style.mainOffer__img}
                width={1090}
                height={468}
                src={`https://trainess-api.dev-vt2b.ru/static/${productImage}`}
                alt="Основное предложение"
              />
            ) : (
              <p>Изображение не найдено</p>
            )}
          </div>
          <div className={style.mainOffer__info}>
            <h1 className={style.mainOffer__heading}>{offer.product.title}</h1>
            <p className={style.mainOffer__description}>
              {offer.product.caliber}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};
