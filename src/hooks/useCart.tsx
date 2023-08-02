import { useQuery } from "react-query";
import { api } from "../lib/axios";
import { Product } from "../lib/product";
import { useAuthUser } from "react-auth-kit";

export type CartItem = {
  id: number;
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
      .get<Cart>(`cart/?token=${authUser && authUser()?.token}`)
      .then((resp) => resp.data),
  );
}

export default useCart;
