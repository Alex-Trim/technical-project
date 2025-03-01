import { gql } from "@apollo/client";

export const REMOVE_PRODUCT_FROM_BASKET = gql`
  mutation RemoveProductFromBasket($product_id: Int!) {
    removeProductFromBasket(product_id: $product_id) {
      product_id
      value
    }
  }
`;
