import {
  Typography,
  Stack,
  Box,
  Skeleton,
  Card,
  CardMedia,
  IconButton,
} from "@mui/material";
import { useQueries } from "react-query";
import { makeProductQuery } from "../routes/product";
import { Remove } from "@mui/icons-material";

export type Cart = {
  id: number;
  userId: number;
  date: string;
  products: {
    productId: number;
    quantity: number;
  }[];
};

export default function CheckoutCart(cart: Cart) {
  const data = useQueries(
    cart.products.map((product) =>
      makeProductQuery(product.productId.toString()),
    ),
  );
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      {/* <Skeleton width="100%" height={150} /> */}

      <Stack gap={2}>
        {data?.map((product) => {
          if (product.isLoading) {
            return (
              <>
                <Skeleton width="100%" height={150} />
              </>
            );
          }
          if (product.data) {
            return (
              <Card
                sx={{
                  height: 150,
                  p: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "start",
                  gap: 2,
                }}
                variant="outlined"
              >
                <CardMedia
                  image={product.data.image}
                  sx={{
                    aspectRatio: 1 / 1,
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
                <Box flexGrow={1}>
                  <Typography fontWeight={700}>{product.data.title}</Typography>
                  <Typography>{product.data.price}</Typography>
                </Box>
                <IconButton>
                  <Remove />
                </IconButton>
              </Card>
            );
          }
        })}
      </Stack>
    </>
  );
}
