import React from "react";
import Image from "next/image";
import Link from "next/link";

import testImg from "../../../public/goods/109a0074-46af-49f1-b178-aab8e3352ad3-Photoroom.png";
import style from "@/styles/Catalog.module.scss";
import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORY } from "@/query/category";
import { GET_ALL_PRODUCTS } from "@/query/products";
import { title } from "process";

interface Product {
  id: string;
  title: string;
  caliber: string;
  price: number;
  Category: {
    title: string;
  };
}
interface GetProductsResponse {
  products: {
    products: Product[];
    totalCount: number;
  };
}

export const Catalog = () => {
  const countProducts = 6;

  const [skipProducts, setSkipProducts] = React.useState(0);
  const [categoryId, setCategoryId] = React.useState(1);
  const [search, setSearch] = React.useState("");

  const productsQuery = useQuery<GetProductsResponse>(GET_ALL_PRODUCTS, {
    variables: { skip: skipProducts, take: countProducts, search },
  });
  const categoryQuery = useQuery(GET_ALL_CATEGORY);

  const [category, setCategory] = React.useState([]);
  const [products, setProducts] = React.useState<Product[]>();

  React.useEffect(() => {
    if (!categoryQuery.loading) {
      setCategory(categoryQuery.data.categories.categories);
    }
  }, [categoryQuery.data]);

  React.useEffect(() => {
    if (!productsQuery.loading) {
      setProducts(productsQuery.data?.products.products);
    }
  }, [productsQuery.data]);

  return (
    <section className={style.catalog}>
      <div className={`container ${style.catalog__container}`}>
        <div className={style.catalog__header}>
          <h2 className={style.catalog__heading}>Каталог</h2>
          <div className={style.catalog__category}>
            <ul className={`list-reset ${style.catalog__list}`}>
              {!categoryQuery.loading &&
                category.map(({ title, id }) => {
                  return (
                    <li key={id}>
                      <button
                        className={
                          id == categoryId
                            ? `${style.catalog__button} ${style.catalog__button__red}`
                            : style.catalog__button
                        }
                      >
                        {title}
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className={style.serchForm}>
            <label htmlFor="" className={style.serchForm__field}>
              <svg
                className={style.serchForm__ison}
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 0C8.22391 0 9.87721 0.684819 11.0962 1.90381C12.3152 3.12279 13 4.77609 13 6.5C13 8.11 12.41 9.59 11.44 10.73L11.71 11H12.5L17.5 16L16 17.5L11 12.5V11.71L10.73 11.44C9.55037 12.4465 8.05065 12.9996 6.5 13C4.77609 13 3.12279 12.3152 1.90381 11.0962C0.684819 9.87721 0 8.22391 0 6.5C0 4.77609 0.684819 3.12279 1.90381 1.90381C3.12279 0.684819 4.77609 0 6.5 0ZM6.5 2C4 2 2 4 2 6.5C2 9 4 11 6.5 11C9 11 11 9 11 6.5C11 4 9 2 6.5 2Z"
                  fill="#161A1E"
                />
              </svg>
              <input
                className={style.serchForm__input}
                type="text"
                placeholder="Поиск товаров"
              />
            </label>
          </div>
        </div>
        <div className={style.catalog__body}>
          <ul className={`list-reset ${style.catalog__product}`}>
            {products?.map(({ id, title, caliber, price, Category }) => {
              return (
                <li key={id}>
                  <Link href={`/goods/${id}`}>
                    <article className={style.card}>
                      <Image
                        className={style.card__img}
                        src={testImg}
                        alt="продукт"
                      />
                      <div className={style.card__bottom}>
                        <div className={style.card__tag}>
                          <samp>{Category.title}</samp>
                        </div>
                        <div className={style.card__info}>
                          <h3 className={style.card__heading}>{title}</h3>
                          <p className={style.card__description}>{caliber}</p>
                          <div className={style.card__cost}>
                            <strong>{price} ₽</strong>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default Catalog;
