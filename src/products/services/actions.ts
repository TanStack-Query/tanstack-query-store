import { type Product, productsApi } from "..";

interface GetProductsOptions {
  filterKey?: string;
}

export const getProducts = async ({
  filterKey,
}: GetProductsOptions): Promise<Product[]> => {
  const filterUrl = filterKey ? `category=${filterKey}` : ``;

  const { data } = await productsApi.get<Product[]>(`/products?${filterUrl}`);
  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
};
