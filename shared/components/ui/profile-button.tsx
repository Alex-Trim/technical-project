import React from "react";
import Link from "next/link";

import UserIcon from "@/public/icon/user.svg";
import { usePathname } from "next/navigation";
import { useAuth } from "@/shared/services/auth-context";
import { ROUTES } from "@/shared/constants/routes";

interface Props {
  onClickSignOut?: () => void;
  onLogout?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({
  className,
  onLogout,
  onClickSignOut,
}) => {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  return (
    <div className={className}>
      {isAuthenticated ? (
        <button
          className={className}
          onClick={() => {
            onClickSignOut?.();
            onLogout?.();
          }}
        >
          <UserIcon />
          <span>Выйти</span>
        </button>
      ) : pathname === ROUTES.LOGIN ? (
        <div className={className}>
          <UserIcon />
          Войти
        </div>
      ) : (
        <Link
          href={ROUTES.LOGIN}
          className={className}
          onClick={onClickSignOut}
        >
          <UserIcon />
          Войти
        </Link>
      )}
    </div>
  );
};
