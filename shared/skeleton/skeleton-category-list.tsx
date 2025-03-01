import React from "react";
import { SkeletonCategory } from "./skeleton-category";

interface Props {
  className?: string;
}

export const SkeletonCategoryList: React.FC<Props> = ({ className }) => {
  return (
    <ul className={className}>
      {Array.from({ length: 6 }).map((_, index) => (
        <li key={index}>
          <SkeletonCategory />
        </li>
      ))}
    </ul>
  );
};
