import { gql } from "@apollo/client";

export const ADD_PRODUCT_TO_BASKET = gql`
  mutation addProductToBasket(
    $addProductToBasketInput: AddProductToBasketInput!
  ) {
    addProductToBasket(addProductToBasketInput: $addProductToBasketInput) {
      basket_id
      product_id
      value
      created_at
      updated_at
      deleted_at
      Basket {
        id
      }
      Product {
        id
        title
        price
      }
    }
  }
`;
