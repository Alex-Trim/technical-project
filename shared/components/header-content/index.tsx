import React from "react";
import Link from "next/link";
import { ROUTES } from "@/shared/constants/routes";
import { useAuth } from "@/shared/services/auth-context";
import { ProfileButton } from "../ui/profile-button";
import СartIcon from "@/public/icon/cart.svg";
import style from "./HeaderContent.module.scss";

interface HeaderContentProps {
  onLinkClick?: () => void;

  className: string;
}

export const HeaderContent: React.FC<HeaderContentProps> = ({
  onLinkClick,

  className,
}) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className={`${className} ${style.content} `}>
      <Link
        className={`${style.content__link} ${style.content__link__img}`}
        href={isAuthenticated ? ROUTES.CART : ROUTES.LOGIN}
        onClick={onLinkClick}
      >
        <СartIcon />
        <span>Корзина</span>
      </Link>
      <ProfileButton
        className={`${style.content__link} ${style.content__link__img} ${style.content__btn}`}
        onClickSignOut={() => {
          onLinkClick?.();
        }}
        onLogout={() => logout()}
      />
    </div>
  );
};
