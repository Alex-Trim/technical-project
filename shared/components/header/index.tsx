"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import style from "./Header.module.scss";
import img_logo from "@/public/images/Logo.png";
import img_logo_min from "@/public/images/Logo_min.png";

import { ROUTES } from "@/shared/constants/routes";
import BurgerMenu from "../burger-menu";
import { HeaderContent } from "../header-content";

export const Header: React.FC = () => {
  const [imageSrc, setImageSrc] = React.useState(img_logo);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth < 768) {
        setImageSrc(img_logo_min);
      } else {
        setImageSrc(img_logo);
      }
    };

    updateImage();
    window.addEventListener("resize", updateImage);
    return () => window.removeEventListener("resize", updateImage);
  }, []);
  return (
    <header className={style.header}>
      <div className={`container  ${style.header__container}`}>
        <div className={style.header__logo}>
          <Link href={ROUTES.HOME}>
            <Image src={imageSrc} alt="Логотип" />
          </Link>
        </div>
        <button
          className={style.header__burger}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <HeaderContent className={style.header__content} />
        <BurgerMenu
          className={style.header__burgerMenu}
          isOpen={isMenuOpen}
          onClose={() => {
            console.log("setIsMenuOpen");
            setIsMenuOpen(false);
          }}
        />
      </div>
    </header>
  );
};
export default Header;
