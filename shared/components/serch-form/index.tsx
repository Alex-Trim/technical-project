"use client";

import React from "react";

import style from "./SearchForm.module.scss";
import { useForm } from "react-hook-form";
import { useDebounce } from "react-use";
import SerchIcon from "@/public/icon/serch.svg";
import { ClearButton } from "../ui/clear-button/clear-button";

interface SearchFormProps {
  setSearch: (search: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ setSearch }) => {
  const { register, watch, setValue } = useForm();
  const searchValue = watch("search", ""); // Отслеживаем значение поля "search"

  const onClickClear = () => {
    setValue("search", "", { shouldValidate: true });
  };

  useDebounce(
    () => {
      setSearch(searchValue);
    },
    250,
    [searchValue]
  );
  return (
    <div className={style.searchForm}>
      <label className={style.searchForm__field}>
        <SerchIcon className={style.searchForm__ison} />
        <input
          className={style.searchForm__input}
          type="text"
          {...register("search")}
          placeholder="Поиск товаров"
        />
        {searchValue && <ClearButton onClick={onClickClear} />}
      </label>
    </div>
  );
};
