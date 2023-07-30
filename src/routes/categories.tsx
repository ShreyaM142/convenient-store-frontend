import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";
import useCategories, { makeCategorySlug } from "../hooks/useCategories";

function Categories() {
  const { data = [undefined, undefined, undefined] } = useCategories();

  if (!data) return <div>Categories</div>;

  return (
    <Grid container spacing={2}>
      {data.map((category) => {
        const categorySlug = makeCategorySlug(category ?? "");
        return (
          <Grid item key={category} sm={6} xs={12} md={4}>
            <Card variant="outlined">
              <CardActionArea component={Link} to={`/store/${categorySlug}`}>
                {category ? (
                  <CardMedia
                    image={`https://loremflickr.com/600/240/${categorySlug}`}
                    sx={{ height: 200 }}
                  />
                ) : (
                  <Skeleton sx={{ height: 200 }} />
                )}
                <CardContent color="primary">
                  {category ?? <Skeleton />}
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
