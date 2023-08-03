import { api } from "./axios";
import { UseQueryOptions } from "react-query";

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  categoryId: number;
  imageURL: string;
  // rating: {
  //   rate: number;
  //   count: number;
  // };
};

export const makeProductQuery = (
  productId?: string,
): UseQueryOptions<Product> => ({
  queryKey: ["product", productId],
  queryFn: async () => {
    const products = await api
      .get<Product[]>(`/product//`)
      .then((resp) => resp.data);
    const foundProduct = products.find(
      (resp) => resp.id.toString() === productId,
    );
    if (!foundProduct) throw new Error(`Product ${productId} not found`);
    return foundProduct;
  },
  enabled: Boolean(productId),
});
