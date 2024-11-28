import React from "react";
import Link from "next/link";

import style from "@/styles/Form.module.scss";
export const Registration = () => {
  return (
    <>
      <section className={style.form}>
        <div className={`container ${style.form__container}`}>
          <h3 className={style.form__heading}>Регистрация</h3>
          <form action="">
            <input
              className={style.form__input}
              type="text"
              placeholder="Почта"
            />
            <input
              className={style.form__input}
              type="text"
              placeholder="Логин"
            />
            <input
              className={style.form__input}
              type="text"
              placeholder="Пароль"
            />
            <input
              className={style.form__input}
              type="text"
              placeholder="Повторите пароль"
            />
            <div className={style.form__bts}>
              <button className={style.form__button}>Зарегистрироваться</button>
              <Link
                className={`${style.form__button} ${style.form__button_transparent}`}
                href="/login"
              >
                Войти в аккаунт
              </Link>
            </div>
          </form>
          <p className={style.form__description}>
            Нажимая "Войти" или "Зарегистрироваться" вы подтверждаете свое
            согласие c 
            <Link className={style.form__link} href="">
              Пользовательским соглашением
            </Link>
            , 
            <Link className={style.form__link} href="">
              Политикой конфиденциальности
            </Link>
            , и 
            <Link className={style.form__link} href="">
              Правилами программы лояльности
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
};
export default Registration;
