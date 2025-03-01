import { Catalog } from "@/shared/components/catalog";
import { MainOffer } from "@/shared/components/main-offer";
import React from "react";

export default function Home() {
  return (
    <>
      <MainOffer />
      <Catalog />
    </>
  );
}
