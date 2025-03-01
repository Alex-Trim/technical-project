"use client";
import React from "react";

import style from "./Pagination.module.scss";
import { useRouter } from "next/navigation";

interface Props {
  totalPages: number;
  page: string | string[];
}

export const Pagination: React.FC<Props> = ({ totalPages, page }) => {
  const router = useRouter();
  const currentPage = Number(page);

  const handlePageChange = (page: number) => {
    router.push(`/?page=${page}`, { scroll: false });
  };
  return (
    <div className={style.pagination}>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          disabled={currentPage === index + 1}
          className={
            currentPage === index + 1
              ? `${style.pagination__btn} ${style.pagination__active}`
              : style.pagination__btn
          }
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
