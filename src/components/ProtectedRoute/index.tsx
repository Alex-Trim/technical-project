import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  useEffect(() => {
    console.log("ProtectedRoute");
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      router.push("/login"); // Редирект на страницу входа
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
