import { useQuery } from "react-query";
import { api } from "../lib/axios";
import { Product } from "../lib/product";
import { useAuthUser } from "react-auth-kit";

export type CartItem = {
  cartId: number;
  quantity: number;
  product: Product;
};

export type Cart = {
  totalCost: number;
  cartItems: CartItem[];
};

function useCart() {
  const authUser = useAuthUser();

  return useQuery(`cart`, () =>
    api
      .get<Cart>(`cart/${authUser && authUser()?.userId}`)
      .then((resp) => resp.data),
  );
}

export default useCart;
