import React from "react";
import Image from "next/image";
import Link from "next/link";
import style from "@/styles/Footer.module.scss";
import img_logo from "../../../public/Logo_min.png";

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={`container ${style.footer__container}`}>
        <div className={style.footer__logo}>
          <Image src={img_logo} alt="Логотип" />
        </div>
        <ul className={`list-reset ${style.footer__nav}`}>
          <li>
            <Link href="">Адреса магазинов</Link>
          </li>
          <li>
            <Link href="">Пользовательское соглашение</Link>
          </li>
          <li>
            <Link href="">Помощь и поддержка</Link>
          </li>
          <li>
            <Link href="">Согласие на обработку персональных данных</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
