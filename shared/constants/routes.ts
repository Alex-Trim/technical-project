export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth",
  REGISTER: "/auth",
  CART: "/cart",

  PROFILE: "/profile",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id: string | number) => `/products/${id}`,
  CHECKOUT: "/checkout",
  NOT_FOUND: "/404",
};
