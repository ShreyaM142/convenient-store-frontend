import { Link, useParams } from "react-router-dom";
// import { useAuthApi } from "../lib/axios";
import { useQuery } from "react-query";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  // Rating,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import useCategories from "../hooks/useCategories";
import { Add } from "@mui/icons-material";
import { Product } from "../lib/product";
import { api } from "../lib/axios";
import { randomImage } from "../lib/randomImage";
import { useAddToCart } from "../hooks/useAddToCart";

function Products() {
  const { category = "" } = useParams();

  // const authApi = useAuthApi();
  const { data: categories } = useCategories();
  const { data = [undefined, undefined, undefined], isLoading } = useQuery(
    ["products", category],
    // () => categories?.find((c) => c.id.toString() === category)?.products,
    async () =>
      (await api.get<Product[]>(`/product/`).then((resp) => resp.data)).filter(
        (resp) => resp.categoryId.toString() === category,
      ),
  );

  if (!data && !isLoading) return <div>Products</div>;

  return (
    <Stack gap={3}>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        // centered
        value={categories?.findIndex(({ id }) => id.toString() === category)}
      >
        {categories?.map((category) => (
          <Tab
            label={category.categoryName}
            component={Link}
            to={`/store/${category.id}`}
            key={category.id}
          />
        )) ?? (
          <Box display="flex" gap={3}>
            <Skeleton height={40} width={100} />
            <Skeleton height={40} width={100} />
          </Box>
        )}
      </Tabs>

      <Grid container spacing={2}>
        {data?.map((product) => {
          return (
            <Grid item key={product?.id} sm={6} xs={12} md={4}>
              <ProductCard product={product} />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}

export default Products;

const ProductCard = ({ product }: { product?: Product }) => {
  const { mutate, isLoading: isAddToCartLoading } = useAddToCart();
  return (
    <Card variant="outlined">
      <CardActionArea component={Link} to={`/store/products/${product?.id}`}>
        {product ? (
          <CardMedia
            image={randomImage(product.name)}
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
          {product?.name ?? <Skeleton />}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Box>
            {/* <Rating
          name="read-only"
          value={product?.rating.rate}
          readOnly
        /> */}
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
            onClick={() => product && mutate(product)}
            disabled={isAddToCartLoading}
          >
            {isAddToCartLoading ? (
              <CircularProgress size="1.5rem" />
            ) : (
              <Add color="primary" />
            )}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};
