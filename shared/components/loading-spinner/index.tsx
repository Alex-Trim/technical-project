import React from "react";
import style from "./LoadingSpinner.module.scss"; // Подключаем стили

const LoadingSpinner: React.FC = () => {
  return (
    <div className={style.spinnerContainer}>
      <div className={style.spinner}></div>
      <p className={style.loadingText}>Загрузка...</p>
    </div>
  );
};

export default LoadingSpinner;
