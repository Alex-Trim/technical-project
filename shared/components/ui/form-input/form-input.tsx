"use client";

import { useFormContext } from "react-hook-form";
import { ClearButton, RequiredSymbol } from "..";

import style from "./form-input.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
}

export const FormInput: React.FC<Props> = ({
  name,
  label,
  required,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={style.formInput}>
      {label && (
        <label
          htmlFor={label}
          className={`${style.formInput__label} ${
            errorText && style.formInput__error
          }`}
        >
          {errorText ? errorText : label} {required && <RequiredSymbol />}
        </label>
      )}

      <div className={style.formInput__group}>
        <input
          id={label}
          className={style.formInput__input}
          {...register(name)}
          {...props}
          placeholder=""
        />

        {value && <ClearButton onClick={onClickClear} />}
      </div>
    </div>
  );
};
