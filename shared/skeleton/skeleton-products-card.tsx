import React from "react";
import Skeleton from "@mui/material/Skeleton";

export const SkeletonProductsCard = () => {
  return (
    <Skeleton
      variant="rectangular"
      width={"100%"}
      height={245}
      style={{ borderRadius: "20px" }}
    />
  );
};
