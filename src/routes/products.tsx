import { Link, useParams } from "react-router-dom";
import { useAuthApi } from "../lib/axios";
import { useQuery } from "react-query";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Rating,
  Skeleton,
  Typography,
} from "@mui/material";
import useCategories, { makeCategorySlug } from "../hooks/useCategories";
import { Product } from "./product";
import { Add } from "@mui/icons-material";

function Products() {
  const { category } = useParams();
  const authApi = useAuthApi();
  const { data: categories } = useCategories();
  const { data = [undefined, undefined, undefined], isLoading } = useQuery(
    ["products", category],
    () =>
      authApi()
        .get<Product[]>(`/products/category/${category}`)
        .then((resp) => resp.data),
  );

  if (!data && !isLoading) return <div>Products</div>;

  return (
    <Box display={"flex"} gap={3}>
      <List
        // sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader id="nested-list-subheader">
            <Typography fontWeight={600} gutterBottom>
              Categories
            </Typography>
          </ListSubheader>
        }
      >
        {categories ? (
          categories.map((category) => (
            <ListItemButton
              component={Link}
              to={`/store/${makeCategorySlug(category)}`}
              key={category}
            >
              <ListItemText primary={category} />
            </ListItemButton>
          ))
        ) : (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )}
      </List>
      <Divider orientation="vertical" flexItem />

      <Grid container spacing={2}>
        {data?.map((product) => {
          return (
            <Grid item key={product?.id} sm={6} xs={12} md={4}>
              <Card variant="outlined">
                <CardActionArea
                  component={Link}
                  to={`/store/products/${product?.id}`}
                >
                  {product ? (
                    <CardMedia
                      image={product?.image}
                      sx={{
                        backgroundSize: "contain",
                        aspectRatio: 1,
                      }}
                    />
                  ) : (
                    <Skeleton
                      width="100%"
                      sx={{
                        aspectRatio: 1,
                      }}
                    />
                  )}
                </CardActionArea>

                <CardContent
                  color="primary"
                  sx={{
                    "&:last-child": {
                      paddingBottom: 2,
                    },

                    textOverflow: "ellipsis",

                    /* Needed to make it work */
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Typography
                    fontWeight={600}
                    fontSize={14}
                    variant="h3"
                    color="text.primary"
                    sx={{
                      textOverflow: "ellipsis",

                      /* Needed to make it work */
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textDecoration: "none",
                      boxShadow: "none",
                    }}
                    gutterBottom
                    component={Link}
                    to={`/store/products/${product?.id}`}
                  >
                    {product?.title ?? <Skeleton />}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-end"
                  >
                    <Box>
                      <Rating
                        name="read-only"
                        value={product?.rating.rate}
                        readOnly
                      />
                      <Typography color="primary" fontWeight={600}>
                        {product?.price ? `$${product.price}` : <Skeleton />}
                      </Typography>
                    </Box>

                    <IconButton
                      sx={{
                        border: "2px solid",
                        borderColor: "primary.main",
                        borderRadius: 2,
                      }}
                      size="small"
                    >
                      <Add color="primary" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Products;
