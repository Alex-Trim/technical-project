import { gql } from "@apollo/client";

export const GET_ALL_CATEGORY = gql`
  query GetCategories($skip: Int, $take: Int) {
    categories(skip: $skip, take: $take) {
      categories {
        id
        title
      }
      totalCount
    }
  }
`;
