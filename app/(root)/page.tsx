import { Catalog } from "@/shared/components/catalog";
import { MainOffer } from "@/shared/components/main-offer";
import React, { Suspense } from "react";

export default function Home() {
  return (
    <>
      <MainOffer />
      <Suspense fallback={<p>Loading...</p>}>
        <Catalog />
      </Suspense>
    </>
  );
}
