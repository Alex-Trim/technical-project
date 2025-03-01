import React from "react";
import Image from "next/image";

import style from "./ProductsCart.module.scss";

import { Product } from "@/@types/product";

interface Props {
  product: Product;
}

export const ProductsCard: React.FC<Props> = ({ product }) => {
  return (
    <article className={style.card}>
      <div className={style.card__picture}>
        <Image
          className={style.card__img}
          width="398"
          height="134"
          src={`https://trainess-api.dev-vt2b.ru/static/${product.ProductDocument[0].Document.name}`}
          alt="продукт"
        />
      </div>
      <div className={style.card__bottom}>
        <div className={style.card__tag}>
          <samp>{product.Category.title}</samp>
        </div>
        <div className={style.card__info}>
          <h3 className={style.card__heading}>{product.title}</h3>
          <p className={style.card__description}>{product.caliber}</p>
          <div className={style.card__cost}>
            <strong>{product.price} ₽</strong>
          </div>
        </div>
      </div>
    </article>
  );
};
