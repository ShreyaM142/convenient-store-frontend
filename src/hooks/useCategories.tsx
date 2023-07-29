import { useQuery } from "react-query";
import { useAuthApi } from "../lib/axios";

function useCategories() {
  const authApi = useAuthApi();
  return useQuery("categories", () =>
    authApi()
      .get<string[]>("/products/categories")
      .then((resp) => resp.data),
  );
}

export default useCategories;