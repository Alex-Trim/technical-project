"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import style from "./Category.module.scss";
import { GET_ALL_CATEGORY } from "@/shared/query/category";
import { useQuery } from "@apollo/client";
import { GetCategoriesResponse } from "@/@types/categories";
import { SkeletonCategoryList } from "@/shared/skeleton/skeleton-category-list";
import { CustomScrollContainer } from "../scroll-container";

interface CategoryProps {
  setCategoryId: (id: number | null) => void;
}

export const Category: React.FC<CategoryProps> = ({ setCategoryId }) => {
  const { data, loading } = useQuery<GetCategoriesResponse>(GET_ALL_CATEGORY);

  const { control } = useForm({ defaultValues: { categoryId: null } });

  if (loading) {
    return <SkeletonCategoryList className={`list-reset ${style.category}`} />;
  }

  const categories = data?.categories.categories;
  if (!categories || categories.length === 0) {
    return <p>Категории не найдены</p>;
  }

  return (
    <CustomScrollContainer maxHeight="200px">
      <ul className={`list-reset ${style.category}`}>
        {categories.map(({ title, id }) => (
          <li key={id}>
            <Controller
              name="categoryId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <button
                  type="button"
                  onClick={() => {
                    const newValue = value === id ? null : id;
                    onChange(newValue);
                    setCategoryId(newValue);
                  }}
                  className={
                    id === value
                      ? `${style.category__button} ${style.category__button__red}`
                      : style.category__button
                  }
                >
                  {title}
                </button>
              )}
            />
          </li>
        ))}
      </ul>
    </CustomScrollContainer>
  );
};
