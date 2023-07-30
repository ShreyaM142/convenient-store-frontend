import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Box, Button, Grid, Rating, Skeleton, Typography } from "@mui/material";
import { makeProductQuery } from "../lib/product";

function ProductPage() {
  const { productId } = useParams();
  const { data: product, isLoading } = useQuery(makeProductQuery(productId));

  if (!product && !isLoading) return null;
  return (
    <>
      <Grid container spacing={6} mt={3}>
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center">
            {product ? (
              <img
                src={product?.image}
                alt={product?.title}
                width={300}
                height={300}
                style={{
                  // width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  aspectRatio: 1 / 1,
                }}
              />
            ) : (
              <Skeleton width={300} height={300} />
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" gap={3} alignItems="start">
            <Typography
              component={"h1"}
              fontWeight={700}
              lineHeight={1.5}
              fontSize="30px"
              width="100%"
            >
              {product?.title ?? <Skeleton />}
            </Typography>
            <Box display="flex" alignItems="center">
              <Rating name="read-only" value={product?.rating.rate} readOnly />(
              {product?.rating.count})
            </Box>
            <Typography color="primary" fontWeight={700} fontSize={25}>
              {product?.price ? `$${product.price}` : <Skeleton width={50} />}
            </Typography>
            {product ? (
              <Button variant="contained">Add to cart</Button>
            ) : (
              <Skeleton>
                <Button variant="contained" />
              </Skeleton>
            )}
            <Typography width="100%">
              {product?.description ?? (
                <>
                  <Skeleton width="100%" />
                  <Skeleton width="100%" />
                  <Skeleton width="100%" />
                </>
              )}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ProductPage;
