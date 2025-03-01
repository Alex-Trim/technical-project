"use client";
import React from "react";

import style from "./Catalog.module.scss";
import { Category } from "../category";
import { SearchForm } from "../serch-form";
import { ProductsWithPagination } from "../products-with-pagination";

export const Catalog = () => {
  const [categoryId, setCategoryId] = React.useState<number | null>(null);
  const [search, setSearch] = React.useState<string>("");
  return (
    <section className={style.catalog}>
      <div className={`container ${style.catalog__container}`}>
        <div className={style.catalog__header}>
          <h2 className={style.catalog__heading}>Каталог</h2>
          <div className={style.catalog__category}>
            <Category setCategoryId={setCategoryId} />
          </div>
          <SearchForm setSearch={setSearch} />
        </div>
        <div className={style.catalog__body}>
          <ProductsWithPagination categoryId={categoryId} search={search} />
        </div>
      </div>
    </section>
  );
};
