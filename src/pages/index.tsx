import React from "react";
import Head from "next/head";
import Image from "next/image";
import Catalog from "@/components/Catalog";

import examplImg from "../../public/goods/saiga-5.png";
import hero from "@/styles/Hero.module.scss";
export default function Home() {
  return (
    <>
      <Head>
        <title>Weapon | Goods</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className={hero.hero}>
          <div className={` ${hero.hero__container}`}>
            <article className={hero.mainOffer}>
              <div className={hero.mainOffer__price}>
                <span>от </span>
                <strong>
                  <span className={hero.mainOffer__cost}>55 800 </span>
                  <span>₽</span>
                </strong>
              </div>
              <div className={hero.mainOffer__picture}>
                <Image
                  className={hero.mainOffer__img}
                  src={examplImg}
                  alt="Логотип"
                />
              </div>
              <div className={hero.mainOffer__info}>
                <h1 className={hero.mainOffer__heading}>Сайга-5 </h1>
                <p className={hero.mainOffer__description}>
                  Самозарядный карабин Сайга-5,45
                </p>
              </div>
            </article>
          </div>
        </section>
        <Catalog />
      </main>
    </>
  );
}
