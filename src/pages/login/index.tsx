import React from "react";
import Link from "next/link";

import style from "@/styles/Form.module.scss";
export const Login = () => {
  return (
    <section className={style.form}>
      <div className={`container ${style.form__container}`}>
        <h3 className={style.form__heading}>Вход в аккаунт</h3>
        <form action="">
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

          <div className={style.form__bts}>
            <Link className={style.form__button} href="/registration">
              Зарегистрироваться
            </Link>
            <button
              className={`${style.form__button} ${style.form__button_transparent}`}
            >
              Войти в аккаунт
            </button>
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
  );
};
export default Login;
