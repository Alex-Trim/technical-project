export interface Document {
  name: string;
}

export interface ProductDocument {
  Document: Document;
}

export interface Product {
  id: number;
  title: string;
  caliber: string;
  price: number;
  Category: {
    title: string;
  };
  ProductDocument: ProductDocument[];
}

export interface GetMainOffer {
  product: {
    id: number;
    title: string;
    price: number;
    caliber: string;
    ProductDocument: ProductDocument[];
  };
}

export interface GetProductListResponse {
  products: {
    products: Product[];
    totalCount: number;
  };
}

interface ProductExtended {
  id: string;
  title: string;
  caliber: string;
  price: number;
  description: string;
  magazine: number;
  article: string;
  barrel_length: number;
  Category: {
    title: string;
  };
  ProductDocument: ProductDocument[];
}

export interface GetProductResponse {
  product: ProductExtended;
}

export interface Basket {
  id: string;
}

export interface ProductsInBasket {
  basket_id: string;
  product_id: string;
  value: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  Basket: Basket;
  Product: Product;
}

export interface FindAllProductsInBasketOutput {
  productsInBasket: ProductsInBasket[];
  totalCount: number;
}
export interface GetBasketForUserData {
  basketForUser: FindAllProductsInBasketOutput;
}
