import { Box, Button, Stack, Typography, Link as MuiLink } from "@mui/material";
import bread from "../assets/breads1.jpg";
import { Link } from "react-router-dom";
import { Storefront } from "@mui/icons-material";
import AccountMenu from "../components/AccountMenu";

export default function Root() {
  return (
    <>
      <Box
        height="100vh"
        width="100%"
        sx={{
          backdropFilter: "brightness(40%)",
          backgroundImage: `url(${bread})`,
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          p: 10,
        }}
      >
        <Box
          position="absolute"
          top={10}
          right={10}
          sx={{
            button: {
              color: "white",
            },
          }}
          display="flex"
          gap={2}
          alignItems="center"
        >
          <MuiLink
            component={Link}
            to="/about"
            underline="hover"
            fontSize="large"
            sx={{
              color: "white",
            }}
          >
            About us
          </MuiLink>
          <AccountMenu />
        </Box>
        <Stack width={{ xs: "100%", md: "50%" }} alignItems="start" gap={5}>
          <Typography
            sx={{
              fontSize: {
                xs: "40px",
                md: "80px",
              },
            }}
            color="white"
            fontWeight="bold"
          >
            Welcome to the bakery
          </Typography>
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
        </Stack>
      </Box>
    </>
  );
}
