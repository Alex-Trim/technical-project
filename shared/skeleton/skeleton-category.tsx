import React from "react";
import Skeleton from "@mui/material/Skeleton";

export const SkeletonCategory = () => {
  return (
    <Skeleton
      variant="rectangular"
      width={155}
      height={45}
      style={{ borderRadius: "20px" }}
    />
  );
};
