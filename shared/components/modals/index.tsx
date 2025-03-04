"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useClickOutside } from "@reactuses/core";
import { ClearButton } from "../ui/clear-button/clear-button";
import style from "./Modal.module.scss";

export const Modal: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // Проверка при загрузке компонента
    const checkMobile = () => window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(checkMobile());

    // Слушатель изменений размера экрана
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handler = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);

    document.body.classList.add("signin");

    return () => {
      mediaQuery.removeEventListener("change", handler);
      document.body.classList.remove("signin");
    };
  }, []);

  useClickOutside(modalRef, () => {
    handleClose();
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <div className={style.modal}>
      <div ref={modalRef} className={style.modal__content}>
        {/* Кнопка закрытия для мобильных */}
        {isMobile && (
          <ClearButton
            onClick={handleClose}
            className={style.modal__CloseButton}
          />
        )}
        {children}
      </div>
    </div>
  );
};
