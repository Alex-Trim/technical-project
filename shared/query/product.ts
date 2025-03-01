import { gql } from "@apollo/client";

export const GET_ONE_PRODUCTS = gql`
  query ($id: Int!) {
    product(id: $id) {
      id
      title
      price

      caliber
      description
      magazine
      caliber
      article
      barrel_length
      Category {
        title
      }
      ProductDocument {
        Document {
          name
        }
      }
    }
  }
`;
