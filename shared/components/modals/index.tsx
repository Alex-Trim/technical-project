"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { useClickOutside } from "@reactuses/core";

import style from "./Modal.module.scss";

export const Modal: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const modalRef = React.useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, () => {
    handleClose();
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <div className={style.modal}>
      <div ref={modalRef} className={style.modal__content}>
        {children}
      </div>
    </div>
  );
};
