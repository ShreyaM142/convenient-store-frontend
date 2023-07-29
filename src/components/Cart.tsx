import * as React from "react";
import { IconButton, Tooltip, Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function CartMenu() {
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
          <Badge badgeContent={4}>
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Tooltip>
    </>
  );
}
