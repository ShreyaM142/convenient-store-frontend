import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Storefront } from "@mui/icons-material";

export function VisitStoreButton() {
  return (
    <Button
      component={Link}
      to="/store"
      size="large"
      variant="contained"
      endIcon={<Storefront />}
      disableElevation
    >
      Visit the store
    </Button>
  );
}
