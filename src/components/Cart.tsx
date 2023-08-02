import { IconButton, Tooltip, Badge, CircularProgress } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

export default function CartMenu() {
  const { data, isLoading } = useCart();
  return (
    <>
      <Tooltip title="Go to your cart">
        <IconButton
          component={Link}
          to="/store/checkout"
          size="small"
          sx={{ ml: 2, color: "white" }}
          aria-controls={"cart-menu"}
        >
          <Badge
            badgeContent={
              isLoading ? (
                <CircularProgress size="1em" />
              ) : (
                data?.cartItems.length
              )
            }
            color="secondary"
          >
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Tooltip>
    </>
  );
}
