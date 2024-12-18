import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import Image from "next/image";
import style from "@/styles/Header.module.scss";
import img_logo from "../../../public/Logo.png";

import { useRouter } from "next/router";
import { useAuth } from "../AuthProvider/AuthProvider";

export const Header: React.FC = () => {
  const router = useRouter();
  const { Logout } = useAuth();
  const { isAuth } = useAuth();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Logout();
    router.reload();
  };

  return (
    <header className={style.header}>
      <div className={`container  ${style.header__container}`}>
        <div className={style.header__logo}>
          <Image src={img_logo} alt="Логотип" />
        </div>
        <nav className={style.header__nav}>
          <ul className={`list-reset ${style.header__navList}`}>
            <li>
              <Link className={style.header__link} href="/">
                Главная
              </Link>
            </li>
            <li>
              <Link className={style.header__link} href="">
                Поддержка
              </Link>
            </li>
            <li>
              <Link className={style.header__link} href="">
                О нас
              </Link>
            </li>
          </ul>
        </nav>
        <div className={style.header__right}>
          <Link
            className={`${style.header__link} ${style.header__link__img}`}
            href={isAuth ? "/cart" : "/login"}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1666 14.0001C13.2416 14.0001 12.4999 14.7417 12.4999 15.6667C12.4999 16.1088 12.6755 16.5327 12.9881 16.8453C13.3006 17.1578 13.7246 17.3334 14.1666 17.3334C14.6086 17.3334 15.0325 17.1578 15.3451 16.8453C15.6577 16.5327 15.8333 16.1088 15.8333 15.6667C15.8333 15.2247 15.6577 14.8008 15.3451 14.4882C15.0325 14.1757 14.6086 14.0001 14.1666 14.0001ZM0.833252 0.666748V2.33341H2.49992L5.49992 8.65841L4.36659 10.7001C4.24159 10.9334 4.16659 11.2084 4.16659 11.5001C4.16659 11.9421 4.34218 12.366 4.65474 12.6786C4.9673 12.9912 5.39122 13.1667 5.83325 13.1667H15.8333V11.5001H6.18325C6.128 11.5001 6.07501 11.4781 6.03594 11.4391C5.99687 11.4 5.97492 11.347 5.97492 11.2917C5.97492 11.2501 5.98325 11.2167 5.99992 11.1917L6.74992 9.83341H12.9583C13.5833 9.83341 14.1333 9.48341 14.4166 8.97508L17.3999 3.58341C17.4583 3.45008 17.4999 3.30841 17.4999 3.16675C17.4999 2.94573 17.4121 2.73377 17.2558 2.57749C17.0996 2.42121 16.8876 2.33341 16.6666 2.33341H4.34159L3.55825 0.666748M5.83325 14.0001C4.90825 14.0001 4.16659 14.7417 4.16659 15.6667C4.16659 16.1088 4.34218 16.5327 4.65474 16.8453C4.9673 17.1578 5.39122 17.3334 5.83325 17.3334C6.27528 17.3334 6.6992 17.1578 7.01176 16.8453C7.32432 16.5327 7.49992 16.1088 7.49992 15.6667C7.49992 15.2247 7.32432 14.8008 7.01176 14.4882C6.6992 14.1757 6.27528 14.0001 5.83325 14.0001Z"
                fill="currentColor"
              />
            </svg>
            <span>Корзина</span>
          </Link>

          {isAuth ? (
            <button
              className={`${style.header__link} ${style.header__link__img} ${style.header__btn}  `}
              onClick={handleLogout}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.99992 0.333252C7.88397 0.333252 8.73182 0.684441 9.35694 1.30956C9.98206 1.93468 10.3333 2.78253 10.3333 3.66659C10.3333 4.55064 9.98206 5.39849 9.35694 6.02361C8.73182 6.64873 7.88397 6.99992 6.99992 6.99992C6.11586 6.99992 5.26802 6.64873 4.6429 6.02361C4.01777 5.39849 3.66659 4.55064 3.66659 3.66659C3.66659 2.78253 4.01777 1.93468 4.6429 1.30956C5.26802 0.684441 6.11586 0.333252 6.99992 0.333252ZM6.99992 8.66658C10.6833 8.66658 13.6666 10.1583 13.6666 11.9999V13.6666H0.333252V11.9999C0.333252 10.1583 3.31659 8.66658 6.99992 8.66658Z"
                  fill="currentColor"
                />
              </svg>
              <span>Выйти</span>
            </button>
          ) : (
            <Link
              className={`${style.header__link} ${style.header__link__img} `}
              href="/login"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.99992 0.333252C7.88397 0.333252 8.73182 0.684441 9.35694 1.30956C9.98206 1.93468 10.3333 2.78253 10.3333 3.66659C10.3333 4.55064 9.98206 5.39849 9.35694 6.02361C8.73182 6.64873 7.88397 6.99992 6.99992 6.99992C6.11586 6.99992 5.26802 6.64873 4.6429 6.02361C4.01777 5.39849 3.66659 4.55064 3.66659 3.66659C3.66659 2.78253 4.01777 1.93468 4.6429 1.30956C5.26802 0.684441 6.11586 0.333252 6.99992 0.333252ZM6.99992 8.66658C10.6833 8.66658 13.6666 10.1583 13.6666 11.9999V13.6666H0.333252V11.9999C0.333252 10.1583 3.31659 8.66658 6.99992 8.66658Z"
                  fill="currentColor"
                />
              </svg>
              <span>Войти</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
