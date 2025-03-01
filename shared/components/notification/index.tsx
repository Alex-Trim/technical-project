import React from "react";

import style from "./Notification.module.scss";

interface Props {
  id: number;
  message: string;
  type?: "success" | "error";
  onClose: () => void; // Функция закрытия
}

export const Notification: React.FC<Props> = ({
  id,
  message,
  type = "error",
  onClose,
}) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Закрытие по таймеру
    return () => clearTimeout(timer); // Очистка таймера
  }, [id, onClose]);

  return (
    <>
      {message && (
        <div
          className={`${style.notification} ${style[type]}`}
          role="alert"
          aria-live="assertive"
        >
          <span>{message}</span>
        </div>
      )}
    </>
  );
};
