import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useForm, Resolver } from "react-hook-form";
import axios from "axios";

import style from "@/styles/Form.module.scss";

type FormValues = {
  login: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  const errors = {} as any;

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

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};

export const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const loginSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post("api/login", {
        login: data.login,
        password: data.password,
      });

      if (response.status !== 200) {
        throw new Error("Ошибка авториза");
      }

      const result = response.data.data;

      Cookies.set("accessToken", result.access_token, { expires: 1 });

      Cookies.set("refreshToken", result.refresh_token, { expires: 7 });

      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        // Устанавливаем сообщение об ошибке в состояние
        console.log(err.response.data.message || "Ошибка авторизации");
      } else {
        console.log("Неизвестная ошибка");
      }
    }
  });

  return (
    <section className={style.form}>
      <div className={`container ${style.form__container}`}>
        <h3 className={style.form__heading}>Вход в аккаунт</h3>
        <form onSubmit={loginSubmit}>
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
