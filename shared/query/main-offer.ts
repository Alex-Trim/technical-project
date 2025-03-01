import { gql } from "@apollo/client";

export const GET_MAIN_OFFER = gql`
  query GetMainOffer {
    product(id: 2) {
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
`;
