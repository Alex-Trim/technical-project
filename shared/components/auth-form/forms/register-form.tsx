"use client";

import React from "react";
import { FormInput } from "../../ui";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  TFormRegisterValues,
  formRegisterSchema,
} from "@/shared/schema/formSchema";

import style from "../Form.module.scss";
import toast from "react-hot-toast";

interface Props {
  onSwitchType?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onSwitchType }) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      login: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registrationSubmit = async (data: TFormRegisterValues) => {
    try {
      const response = await axios.post(
        "https://trainess-api.dev-vt2b.ru/auth/registration",
        {
          email: data.email,
          login: data.login,
          password: data.password,
        }
      );
      toast.error("Регистрация успешна 📝. Подтвердите свою почту", {
        icon: "✅",
      });

      form.reset();
    } catch (error: any) {
      return toast.error("Ошибка регистрации неверный E-Mail или пароль", {
        icon: "❌",
      });
    }
  };

  return (
    <>
      <h3 className={style.form__heading}>Регистрация</h3>
      <FormProvider {...form}>
        <form
          className={style.form__form}
          onSubmit={form.handleSubmit(registrationSubmit)}
        >
          <FormInput label="Почта" name={"email"} type="email" required />
          <FormInput label="Логин" name={"login"} type="text" required />
          <FormInput
            label="Пароль"
            name={"password"}
            type="password"
            required
          />
          <FormInput
            label="Повторите пароль"
            name={"confirmPassword"}
            type="password"
            required
          />
          <div className={style.form__bts}>
            <button className={`${style.form__button}`}>
              Зарегистрироваться
            </button>
            <button
              className={`${style.form__button} ${style.form__button_transparent}`}
              onClick={onSwitchType}
            >
              Войти в аккаунт
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
