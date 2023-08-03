import { useMutation, useQueryClient } from "react-query";
import { Product } from "../lib/product";
import { api } from "../lib/axios";
import { useAuthUser } from "react-auth-kit";

export function useAddToCart() {
  const authUser = useAuthUser();
  const queryClient = useQueryClient();
  return useMutation(
    (product: Product) => {
      return api.post(`/cart/add/${authUser && authUser()?.userId}`, {
        id: 1,
        productId: product.id,
        quantity: 1,
      });
    },
    {
      onSuccess() {
        queryClient.invalidateQueries("cart");
      },
    },
  );
}
