import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { Link } from "react-router-dom";

function LinkButton(props: ButtonProps<typeof Link>) {
  return <Button component={Link} {...props} />;
}

export default LinkButton;
