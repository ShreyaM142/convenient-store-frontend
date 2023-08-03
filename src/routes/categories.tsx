import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import { randomImage } from "../lib/randomImage";

function Categories() {
  const { data = [undefined, undefined, undefined] } = useCategories();

  return (
    <Grid container spacing={2}>
      {data.map((category) => {
        return (
          <Grid item key={category?.id} sm={6} xs={12} md={4}>
            <Card variant="outlined">
              <CardActionArea
                component={Link}
                to={`/store/${category?.id}`}
                disabled={!category}
              >
                {category ? (
                  <CardMedia
                    image={randomImage(category?.categoryName)}
                    sx={{ height: 200 }}
                    component="img"
                    loading="lazy"
                  />
                ) : (
                  <Skeleton sx={{ height: 200 }} />
                )}
                <CardContent color="primary">
                  {category?.categoryName ?? <Skeleton />}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Categories;
