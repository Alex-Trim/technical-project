import Image from "next/image";
import React from "react";

import style from "@/styles/Goods.module.scss";
import testImg from "../../../../public/goods/109a0074-46af-49f1-b178-aab8e3352ad32.png";

export const Goods = () => {
  return (
    <main>
      <section className={style.goods}>
        <div className={style.goods__swiper}>
          <div className={style.goods__wrapper}>
            <div
              className={`${style.goods__slide} ${style.goods__slide__activ}`}
            >
              <Image src={testImg} alt="товар" />
            </div>
          </div>
        </div>
        <div className={style.goods__info}>
          <div className="container">
            <div className={style.goods__header}>
              <h2 className={style.goods__heading}>Сайга-ППК</h2>
              <div className={style.goods__price}>
                <strong>
                  <p className={style.goods__cost}>104 649 ₽</p>
                </strong>
              </div>
              <button className={style.goods__button}>
                Добавить в корзину
              </button>
            </div>
            <div
              className={`${style.goods__specifications} ${style.specifications}`}
            >
              <ul className={`list-reset ${style.specifications__list}`}>
                <li className={style.specifications__item}>
                  <article className={style.specifications__field}>
                    <h3 className={style.specifications__header}>Описание</h3>
                    <p className={style.specifications__description}>
                      Самозарядный карабин Сайга-ППК разработан на базе
                      пистолета-пулемёта ППК20 и максимально унифицирован с ним.
                      Благодаря применяемому патрону 9х19 может использоваться в
                      пистолетных тирах.
                    </p>
                  </article>
                </li>
                <li className={style.specifications__item}>
                  <article className={style.specifications__field}>
                    <h3 className={style.specifications__header}>Магазин</h3>
                    <p className={style.specifications__description}>
                      10 патронов
                    </p>
                  </article>
                </li>
                <li className={style.specifications__item}>
                  <article className={style.specifications__field}>
                    <h3 className={style.specifications__header}>Калибр</h3>
                    <p className={style.specifications__description}>9x19</p>
                  </article>
                </li>
                <li className={style.specifications__item}>
                  <article className={style.specifications__field}>
                    <h3 className={style.specifications__header}>
                      Длинна ствола
                    </h3>
                    <p className={style.specifications__description}>415 мм</p>
                  </article>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Goods;
