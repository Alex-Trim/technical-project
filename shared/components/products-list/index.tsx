import React from "react";
import Link from "next/link";

import { ProductsCard } from "../product-card";
import { Product } from "@/@types/product";

interface Props {
  products: Product[];
  className?: string;
}

export const ProductsList: React.FC<Props> = ({ products, className }) => {
  return (
    <ul className={className}>
      {products.map((product) => {
        return (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              <ProductsCard product={product} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
