import React from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./Footer.module.scss";
import img_logo from "@/public/images/Logo_min.png";

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={`container ${style.footer__container}`}>
        <div className={style.footer__logo}>
          <Image src={img_logo} alt="Логотип" />
        </div>
        <ul className={`${style.footer__nav}`}>
          <li>
            <Link className={style.footer__link} href="">
              Адреса магазинов
            </Link>
          </li>
          <li>
            <Link className={style.footer__link} href="">
              Пользовательское соглашение
            </Link>
          </li>
          <li>
            <Link className={style.footer__link} href="">
              Помощь и поддержка
            </Link>
          </li>
          <li>
            <Link className={style.footer__link} href="">
              Согласие на обработку персональных данных
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
