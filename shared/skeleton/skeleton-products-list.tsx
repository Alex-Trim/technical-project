import React from "react";
import { SkeletonProductsCard } from "./skeleton-products-card";

interface Props {
  className?: string;
}

export const SkeletonProductsList: React.FC<Props> = ({ className }) => {
  return (
    <ul className={className}>
      {Array.from({ length: 6 }).map((_, index) => (
        <li key={index}>
          <SkeletonProductsCard />
        </li>
      ))}
    </ul>
  );
};
