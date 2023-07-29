import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthApi } from "../lib/axios";
import { useQuery } from "react-query";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
// import { useIsAuthenticated } from "react-auth-kit";
import useCategories from "../hooks/useCategories";

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

function Products() {
  const { category } = useParams();
  //   const isAuthenticated = useIsAuthenticated();
  const authApi = useAuthApi();
  const { data: categories } = useCategories();
  const { data } = useQuery(["products", category], () =>
    authApi()
      .get<Product[]>(`/products/category/${category}`)
      .then((resp) => resp.data),
  );
  if (!data) return <div>Products</div>;

  return (
    <Box display={"flex"}>
      {categories && (
        <Box>
          {categories.map((category) => (
            <Typography>{category}</Typography>
          ))}
        </Box>
      )}
      <Grid container spacing={2}>
        {data.map((product) => {
          // const categorySlug = category.replace(" ", "-");
          return (
            <Grid item key={product.id} sm={6} xs={12} md={4}>
              <Card variant="outlined">
                <CardActionArea
                  component={Link}
                  to={`/store/products/${product.id}`}
                >
                  <CardMedia
                    image={product.image}
                    sx={{
                      height: 400,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <CardContent
                    color="primary"
                    sx={{
                      textOverflow: "ellipsis",

                      /* Needed to make it work */
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.title}
                  </CardContent>
                  <CardActions disableSpacing sx={{ justifyContent: "end" }}>
                    <Button>Add to cart</Button>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Products;
