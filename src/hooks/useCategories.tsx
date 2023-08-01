import { useQuery } from "react-query";
import { api } from "../lib/axios";
import { Product } from "../lib/product";

export type Category = {
  categoryName: string;
  description: string;
  id: number;
  imageUrl: string;
  products: Product[];
};

function useCategories() {
  return useQuery("categories", () =>
    api
      .get<Category[]>("/category//", {
        headers: {
          Accept: "*/*",
        },
      })
      .then((resp) => resp.data),
  );
}

export default useCategories;
