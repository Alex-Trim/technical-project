import React from "react";
import Link from "next/link";
import { useForm, Resolver } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";

import style from "@/styles/Form.module.scss";

type FormValues = {
  email: string;
  login: string;
  password: string;
  confirmPassword: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  const errors = {} as any;
  if (!values.email) {
    errors.email = {
      type: "required",
      message: "Это поле обязательно.",
    };
  }

  if (!values.login) {
    errors.login = {
      type: "required",
      message: "Это поле обязательно.",
    };
  }

  if (!values.password) {
    errors.password = {
      type: "required",
      message: "Это поле обязательно.",
    };
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = {
      type: "match",
      message: "Пароли не совпадают.",
    };
  }

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};

export const Registration = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const registrationSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post(
        "https://trainess-api.dev-vt2b.ru/auth/registration",
        {
          login: data.login,
          password: data.password,
          email: data.email,
        }
      );

      if (response.status !== 200) {
        throw new Error("Ошибка регистрации");
      }

      const result = response.data;

      Cookies.set("accessToken", result.accessToken, { expires: 1 });
      Cookies.set("refreshToken", result.refreshToken, { expires: 7 });

      router.push("/");
    } catch (error) {
      console.error("Ошибка:", error);
    }
  });

  return (
    <>
      <section className={style.form}>
        <div className={`container ${style.form__container}`}>
          <h3 className={style.form__heading}>Регистрация</h3>
          <form onSubmit={registrationSubmit}>
            <input
              className={style.form__input}
              type="email"
              placeholder="Почта"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className={style.form__error}>{errors.email.message}</p>
            )}
            <input
              className={style.form__input}
              type="text"
              placeholder="Логин"
              {...register("login", { required: true })}
            />
            {errors.login && (
              <p className={style.form__error}>{errors.login.message}</p>
            )}
            <input
              className={style.form__input}
              type="password"
              placeholder="Пароль"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className={style.form__error}>{errors.password.message}</p>
            )}
            <input
              className={style.form__input}
              type="password"
              placeholder="Повторите пароль"
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword && (
              <p className={style.form__error}>
                {errors.confirmPassword.message}
              </p>
            )}
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
