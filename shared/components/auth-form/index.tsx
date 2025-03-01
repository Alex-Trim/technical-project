"use client";
import React from "react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";
import Link from "next/link";

import style from "./Form.module.scss";
interface Props {
  onCloses?: VoidFunction;
}

export const AuthForm: React.FC<Props> = ({ onCloses }) => {
  const [type, setType] = React.useState<"login" | "register">("login");

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };

  return (
    <section className={style.form}>
      <div className={`container ${style.form__container}`}>
        {type === "login" ? (
          <LoginForm onCloses={onCloses} onSwitchType={onSwitchType} />
        ) : (
          <RegisterForm onSwitchType={onSwitchType} />
        )}

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
