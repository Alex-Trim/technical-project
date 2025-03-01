"use client";

import React from "react";
import { FormInput } from "../../ui";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TFormLoginValues, formLoginSchema } from "@/shared/schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import style from "../Form.module.scss";
import { useAuth } from "@/shared/services/auth-context";

interface Props {
  onCloses?: VoidFunction;
  onSwitchType?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onCloses, onSwitchType }) => {
  const { login } = useAuth();
  const router = useRouter();

  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const loginSubmit = async (data: TFormLoginValues) => {
    try {
      const response = await axios.post(
        "https://trainess-api.dev-vt2b.ru/auth/login",
        {
          login: data.login,
          password: data.password,
        }
      );
      toast.success("Вы успешно вошли в аккаунт", {
        icon: "✅",
      });
      const { access_token, refresh_token } = response.data;

      login(access_token, refresh_token);
      form.reset();
      onCloses ? onCloses() : router.push("/");
    } catch (error: any) {
      toast.error("Не удалось авторизоваться. Проверьте данные.", {
        icon: "❌",
      });
    }
  };

  return (
    <>
      <h3 className={style.form__heading}>Вход в аккаунт</h3>
      <FormProvider {...form}>
        <form
          className={style.form__form}
          onSubmit={form.handleSubmit(loginSubmit)}
        >
          <FormInput label="Логин" name={"login"} required />
          <FormInput
            label="Пароль"
            name={"password"}
            type="password"
            required
          />
          <div className={style.form__bts}>
            <button className={`${style.form__button}`}>Войти</button>
            <button
              className={`${style.form__button} ${style.form__button_transparent}`}
              onClick={onSwitchType}
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
