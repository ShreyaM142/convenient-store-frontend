import {
  Typography,
  Stack,
  Box,
  Card,
  CardMedia,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Remove } from "@mui/icons-material";
// import { Product } from "../lib/product";
import { Cart, CartItem } from "../hooks/useCart";
import { useAuthUser } from "react-auth-kit";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../lib/axios";
import { randomImage } from "../lib/randomImage";

export default function CheckoutCart(cart: Cart) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Items in your cart
      </Typography>
      {/* <Skeleton width="100%" height={150} /> */}

      <Stack gap={2}>
        {cart.cartItems.map((cartItem) => {
          return <CartItemCard cartItem={cartItem} />;
        })}
      </Stack>
    </>
  );
}
function CartItemCard({ cartItem }: { cartItem: CartItem }) {
  // const authUser = useAuthUser();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (cartItem: CartItem) => api.delete(`cart/delete/${cartItem.cartId}`),
    {
      onSuccess() {
        queryClient.invalidateQueries("cart");
      },
    },
  );

  return (
    <Card
      key={cartItem.id}
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
        image={randomImage(cartItem.product.name)}
        sx={{
          aspectRatio: 1,
          height: "100%",
          objectFit: "contain",
        }}
      />
      <Box flexGrow={1}>
        <Typography fontWeight={700}>{cartItem.product.name}</Typography>
        <Typography>${cartItem.product.price}</Typography>
      </Box>

      <IconButton
        size="small"
        onClick={() => mutate(cartItem)}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size="1.5rem" /> : <Remove />}
      </IconButton>
    </Card>
  );
}
