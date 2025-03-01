import React from "react";
import { ProductPage } from "@/shared/components/product-page";

export const Products = ({ params }: { params: { id: string } }) => {
  return <ProductPage productId={params.id} />;
};
export default Products;
