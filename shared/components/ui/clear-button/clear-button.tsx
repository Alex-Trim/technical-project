import React from "react";
import style from "./clear-button.module.scss";
import X from "@/public/icon/x.svg";

interface Props {
  className?: string;
  onClick?: VoidFunction;
}

export const ClearButton: React.FC<Props> = ({ onClick, className }) => {
  return (
    <button onClick={onClick} className={`${style.clearButton} ${className}`}>
      <X className={style.clearButton__icon} />
    </button>
  );
};
