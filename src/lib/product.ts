import { api } from "./axios";
import { UseQueryOptions } from "react-query";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export const makeProductQuery = (
  productId?: string,
): UseQueryOptions<Product> => ({
  queryKey: ["product", productId],
  queryFn: () =>
    api.get<Product>(`/products/${productId}`).then((resp) => resp.data),
  enabled: Boolean(productId),
});
