"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";

import style from "./ProductsWithPagination.module.scss";
import { GET_ALL_PRODUCTS } from "@/shared/query/products";
import { GetProductListResponse } from "@/@types/product";
import { SkeletonProductsList } from "@/shared/skeleton/skeleton-products-list";
import { ProductsList } from "../products-list";
import { Pagination } from "../pagination";

interface ProductsWithPaginationProps {
  search: string;
  categoryId: number | null;
}

export const ProductsWithPagination: React.FC<ProductsWithPaginationProps> = ({
  search,
  categoryId,
}) => {
  const router = useRouter();
  const countProducts = 6;
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  React.useEffect(() => {
    router.push(`/?page=1`, { scroll: false });
  }, [categoryId, search]);
  const startIndex = (Number(page) - 1) * countProducts;

  const { data, loading, error } = useQuery<GetProductListResponse>(
    GET_ALL_PRODUCTS,
    {
      variables: {
        skip: startIndex,
        take: countProducts,
        categoryId: categoryId || undefined,
        search: search,
      },
      fetchPolicy: "cache-and-network",
    }
  );

  if (error) return <p>Ошибка: {error.message}</p>;

  const totalPages = Math.ceil(
    (data?.products.totalCount ?? 0) / countProducts
  );
  const productsList = data?.products.products || [];

  return (
    <>
      {loading ? (
        <SkeletonProductsList className={`list-reset ${style.productList}`} />
      ) : (
        <ProductsList
          products={productsList}
          className={`list-reset ${style.productList}`}
        />
      )}
      <Pagination totalPages={totalPages} page={page} />
    </>
  );
};
