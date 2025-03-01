import { gql } from "@apollo/client";

export const UPDATE_BASKET_INPUT = gql`
  mutation ChangeProductValueInBasket($updateBasketInput: UpdateBasketInput!) {
    changeProductValueInBasket(updateBasketInput: $updateBasketInput) {
      product_id
      value
    }
  }
`;
