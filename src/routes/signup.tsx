import * as React from "react";

import {
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Link as MuiLink,
  Paper,
  Box,
  Grid,
  Typography,
  TypographyProps,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useIsAuthenticated } from "react-auth-kit";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../lib/axios";
import { useMutation } from "react-query";
import { LoadingButton } from "@mui/lab";

function Copyright(props: TypographyProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <MuiLink color="inherit" href="https://mui.com/">
        Your Website
      </MuiLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export type SignupInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function SignUpSide() {
  const isAuthenticated = useIsAuthenticated();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const redirectTo = searchParams.get("redirectTo");
  const { mutate, isLoading } = useMutation(
    (formData: FormData) => {
      const signupData = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password"),
      };
      return api.post("/user/signup", signupData);
    },
    {
      onSuccess(data) {
        if (data.data.status === "success")
          navigate(
            `/login?redirectTo=${
              redirectTo?.startsWith("/") ? redirectTo : "/"
            }`,
          );
      },
    },
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(new FormData(event.currentTarget));
  };

  if (isAuthenticated()) return <Navigate to={"/store"} />;

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First name"
              name="firstName"
              autoComplete="given-name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isLoading}
            >
              Sign In
            </LoadingButton>
            <MuiLink
              component={Link}
              to={`/login?redirectTo=${redirectTo ?? "/"}`}
              variant="body2"
            >
              {"Already have an account? Sign In"}
            </MuiLink>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
