import React from "react";

import style from "./BurgerMenu.module.scss";
import { HeaderContent } from "../header-content";

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const BurgerMenu: React.FC<Props> = ({ isOpen, onClose, className }) => {
  return (
    <div
      className={`${className} ${style.burgerMenu} ${
        isOpen ? style.burgerMenu__open : ""
      }`}
    >
      <button className={style.burgerMenu__closeButton} onClick={onClose}>
        &times;
      </button>

      <HeaderContent
        className={style.burgerMenu__content}
        onLinkClick={onClose}
      />
    </div>
  );
};
export default BurgerMenu;
