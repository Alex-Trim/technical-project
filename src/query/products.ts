import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetProducts($skip: Int, $take: Int, $search: String, $categoryId: Int) {
    products(
      skip: $skip
      take: $take
      search: $search
      categoryId: $categoryId
    ) {
      products {
        id
        title
        caliber
        price
        Category {
          title
        }
        ProductDocument {
          Document {
            name
          }
        }
      }
      totalCount
    }
    mainOffer: product(id: 2) {
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
