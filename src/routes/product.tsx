import { useParams } from "react-router-dom";
import { api } from "../lib/axios";
import { UseQueryOptions, useQuery } from "react-query";
import { Box, Button, Grid, Typography } from "@mui/material";

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

function ProductPage() {
  const { productId } = useParams();
  const { data: product } = useQuery(makeProductQuery(productId));

  if (!product) return null;
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center">
            <img
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                aspectRatio: 1 / 1,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" gap={3} alignItems="start">
            <Typography
              component={"h1"}
              fontWeight={700}
              lineHeight={1.5}
              fontSize="30px"
            >
              {product.title}
            </Typography>
            <Button variant="contained">Add to cart</Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ProductPage;
