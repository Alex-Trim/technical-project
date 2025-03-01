import { gql } from "@apollo/client";

export const GET_BASKET_FOR_USER = gql`
  query GetBasketForUser($skip: Int, $take: Int) {
    basketForUser(skip: $skip, take: $take) {
      productsInBasket {
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
          caliber
          ProductDocument {
            Document {
              name
            }
          }
        }
      }
      totalCount
    }
  }
`;
