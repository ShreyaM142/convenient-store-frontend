import { useQuery } from "react-query";
import {
  api,
  // useAuthApi
} from "../lib/axios";
import { Product } from "../lib/product";

export type Category = {
  categoryName: string;
  description: string;
  id: number;
  imageUrl: string;
  products: Product[];
};

function useCategories() {
  // const authApi = useAuthApi();
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
export function makeCategorySlug(category: string) {
  return category.replace(" ", "-");
}

export default useCategories;
