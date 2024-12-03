import Cookies from "js-cookie";

const useAuth = () => {
  const cookies = Cookies.get("accessToken");

  const isAuthenticated = !!cookies;
  return { isAuthenticated };
};

export default useAuth;
