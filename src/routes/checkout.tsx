import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Review from "../components/Review";
import CheckoutCart from "../components/CheckoutCart";
import useCart, { Cart } from "../hooks/useCart";
import { VisitStoreButton } from "../components/VisitStoreButton";
import { Stack } from "@mui/material";
import { useIsAuthenticated } from "react-auth-kit";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = [
  { component: CheckoutCart, label: "Your cart" },
  // { component: AddressForm, label: "Shipping address" },
  // { component: PaymentForm, label: "Payment details" },
  { component: Review, label: "Review your order" },
];

function GetStepContent({ cart, step }: { step: number; cart: Cart }) {
  const Component = steps[step].component;
  return <Component {...cart} />;
}

export default function Checkout() {
  const isAuthenticated = useIsAuthenticated();
  const { data, isLoading } = useCart();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  if (!isAuthenticated())
    return (
      <Typography textAlign="center" my={10}>
        You need to be logged in to view this page
      </Typography>
    );
  if (isLoading)
    return (
      <Typography textAlign="center" my={10}>
        Loading your cart
      </Typography>
    );
  if (!isLoading && !data)
    return (
      <Typography textAlign="center" my={10}>
        There was a problem loading your cart
      </Typography>
    );

  return (
    <React.Fragment>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          {data.cartItems.length ? (
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map(({ label }) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          ) : (
            <React.Fragment>
              <Stack my={10} alignItems="center">
                <Typography variant="h5" gutterBottom mb={2}>
                  Your cart is empty
                </Typography>
                <VisitStoreButton />
              </Stack>
            </React.Fragment>
          )}
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order is confirmed, we have emailed your order
                confirmation, order will be ready to pick up in 30 mins.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {data.cartItems.length > 0 && (
                <>
                  <GetStepContent step={activeStep} cart={data} />
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </Button>
                  </Box>
                </>
              )}
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
