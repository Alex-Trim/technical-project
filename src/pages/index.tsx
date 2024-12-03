import React from "react";
import Head from "next/head";
import Image from "next/image";
import debounce from "lodash.debounce";
import examplImg from "../../public/goods/saiga-5.png";
import style from "@/styles/Hero.module.scss";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "@/query/products";
import { GET_ALL_CATEGORY } from "@/query/category";
import Link from "next/link";
// Интерфейс для документа
interface Document {
  name: string;
}

// Интерфейс для продукта
interface ProductDocument {
  Document: Document;
}

interface Product {
  id: string;
  title: string;
  caliber: string;
  price: number;
  Category: {
    title: string;
  };
  ProductDocument: ProductDocument[];
}
interface GetProductsResponse {
  products: {
    products: Product[];
    totalCount: number;
  };
  mainOffer: {
    id: string;
    title: string;
    caliber: string;
    price: number;
    ProductDocument: ProductDocument[];
  };
}
interface Categories {
  id: number;
  title: string;
}

interface GetCategoriesResponse {
  categories: {
    categories: Categories[];
    totalCount: number;
  };
}
export default function Home() {
  const countProducts = 6;

  const router = useRouter(); // Используйте useRouter
  const { page = 1 } = router.query; // Получите номер страницы из URL
  const currentPage = Number(page); // Преобразуйте его в число
  const skipProducts = (currentPage - 1) * countProducts; // Рассчитайте skipProducts

  const [categoryId, setCategoryId] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");
  const [search, setSearch] = React.useState("");

  const variables: any = {
    skip: skipProducts,
    take: countProducts,
    // categoryId: categoryId,
    search: search,
  };

  const handleCategoryChange = (id: number) => {
    setCategoryId(id); // Обновляем состояние categoryId
  };

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useQuery<GetProductsResponse>(GET_ALL_PRODUCTS, {
    variables,
    fetchPolicy: "no-cache",
  });

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery<GetCategoriesResponse>(GET_ALL_CATEGORY);

  const totalPages = Math.ceil(
    (productsData?.products?.totalCount ?? 0) / countProducts
  );

  const handlePageChange = (page: number) => {
    router.push(`/?page=${page}`); // Переход на выбранную страницу
  };

  const serchDebounce = React.useCallback(
    debounce((text: string) => {
      setSearch(text);
    }, 1000),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    serchDebounce(event.target.value);
  };
  return (
    <>
      <Head>
        <title>Weapon | Goods</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={style.hero}>
        <div className={` ${style.hero__container}`}>
          <article className={style.mainOffer}>
            <div className={style.mainOffer__price}>
              <span>от </span>
              <strong>
                <span className={style.mainOffer__cost}>
                  {productsData?.mainOffer.price}
                </span>
                <span>₽</span>
              </strong>
            </div>
            <div className={style.mainOffer__picture}>
              <Image
                className={style.mainOffer__img}
                width="1090"
                height="468"
                src={`https://trainess-api.dev-vt2b.ru/static/${productsData?.mainOffer.ProductDocument[0].Document.name}`}
                alt="Логотип"
              />
            </div>
            <div className={style.mainOffer__info}>
              <h1 className={style.mainOffer__heading}>
                {productsData?.mainOffer.title}{" "}
              </h1>
              <p className={style.mainOffer__description}>
                {productsData?.mainOffer.caliber}
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className={style.catalog}>
        <div className={`container ${style.catalog__container}`}>
          <div className={style.catalog__header}>
            <h2 className={style.catalog__heading}>Каталог</h2>
            <div className={style.catalog__category}>
              <ul className={`list-reset ${style.catalog__list}`}>
                {!categoryLoading &&
                  categoryData?.categories.categories.map(({ title, id }) => {
                    return (
                      <li key={id}>
                        <button
                          onClick={() => handleCategoryChange(id)}
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
                  value={searchValue} // Устанавливаем значение из состояния
                  onChange={onChangeInput} // Обновляем состояние поиска
                />
              </label>
            </div>
          </div>
          <div className={style.catalog__body}>
            <ul className={`list-reset ${style.catalog__product}`}>
              {!productsLoading &&
                productsData?.products.products?.map(
                  ({
                    id,
                    title,
                    caliber,
                    price,
                    Category,
                    ProductDocument,
                  }) => {
                    return (
                      <li key={id}>
                        <Link href={`/goods/${id}`}>
                          <article className={style.card}>
                            <Image
                              className={style.card__img}
                              width="398"
                              height="134"
                              src={`https://trainess-api.dev-vt2b.ru/static/${ProductDocument[0].Document.name}`}
                              alt="продукт"
                            />
                            <div className={style.card__bottom}>
                              <div className={style.card__tag}>
                                <samp>{Category.title}</samp>
                              </div>
                              <div className={style.card__info}>
                                <h3 className={style.card__heading}>{title}</h3>
                                <p className={style.card__description}>
                                  {caliber}
                                </p>
                                <div className={style.card__cost}>
                                  <strong>{price} ₽</strong>
                                </div>
                              </div>
                            </div>
                          </article>
                        </Link>
                      </li>
                    );
                  }
                )}
            </ul>
            <div className={style.catalog__pagination}>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  disabled={currentPage === index + 1}
                  className={
                    currentPage === index + 1
                      ? `${style.btn} ${style.active}`
                      : style.btn
                  }
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
