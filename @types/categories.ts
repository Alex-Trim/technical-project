export interface Categories {
  id: number;
  title: string;
}

export interface GetCategoriesResponse {
  categories: {
    categories: Categories[];
    totalCount: number;
  };
}
