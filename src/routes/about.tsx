import { Box, Stack, Typography, Link as MuiLink } from "@mui/material";
import bread from "../assets/breads1.jpg";
import { Link } from "react-router-dom";
import AccountMenu from "../components/AccountMenu";
import { VisitStoreButton } from "../components/VisitStoreButton";

export default function About() {
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
          overflow: "auto",
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
        <Box height={"100%"} width="100%" overflow="auto" p={10}>
          <Stack width={{ xs: "100%", md: "50%" }} alignItems="start" gap={5}>
            <Typography variant="h3" color="white" fontWeight="bold">
              About us
            </Typography>
            <VisitStoreButton />

            <Typography variant="body1" color="white">
              At [Bakery Name], we believe that every day should be filled with
              joy and sweetness. Our passion for baking transcends generations,
              and we take immense pride in bringing you a wide array of
              scrumptious treats that warm your heart and tantalize your taste
              buds.
              <br />
              <br />
              Our bakery was born out of love and a shared dream. [Founder's
              Name], the mastermind behind [Bakery Name], has been baking since
              childhood, learning the art and secrets from their grandmother who
              passed down treasured recipes through the ages. Inspired by the
              memories of baking together and the joy it brought to family and
              friends, [Founder's Name] decided to turn their lifelong passion
              into a delightful reality.
              <br />
              <br />
              Founded in [Year], [Bakery Name] has since been a thriving hub for
              bakery enthusiasts, a place where love, warmth, and irresistible
              flavors unite. We started as a humble establishment, baking for
              local communities, and soon our delectable creations became the
              talk of the town.
              <br />
              <br />
              Our commitment to quality, freshness, and taste is unwavering. We
              handpick the finest ingredients, sourcing locally whenever
              possible, to ensure that every bite is an explosion of goodness.
              <br />
              <br />
              Craftsmanship is at the heart of what we do. Our expert bakers
              pour their heart and soul into each creation, combining
              traditional techniques with a touch of innovation. From our oven
              to your plate, each product undergoes meticulous care, maintaining
              the highest standards of excellence.
              <br />
              <br />
              Step into our bakery, and you'll be greeted by an enchanting
              display of artisanal bread, delectable pastries, exquisite cakes,
              and cookies that beckon you to indulge. From our signature
              cinnamon rolls that melt in your mouth to our buttery croissants
              that transport you to Paris, every item is a testament to our
              commitment to perfection.
              <br />
              <br />
              Embracing diversity and catering to various dietary preferences,
              we also offer a delightful range of gluten-free, vegan, and
              sugar-free options without compromising on taste.
              <br />
              <br />
              At [Bakery Name], we cherish the relationships we build with our
              customers and the community. We strive to be more than just a
              bakery; we aim to be a gathering place, a source of comfort, and a
              part of your cherished memories.
              <br />
              <br />
              We value sustainability and work towards minimizing our
              environmental footprint. Our packaging is eco-friendly, and we
              actively support local farmers and suppliers, contributing to the
              well-being of our community.
              <br />
              <br />
              Thank you for visiting [Bakery Name]. We are honored to share our
              passion for baking with you. Every day, we look forward to
              welcoming you into our bakery, where happiness resides in the form
              of delightful flavors.
              <br />
              <br />
              Come, savor the magic of [Bakery Name], and let us take you on a
              journey of pure indulgence. Your sweet cravings are just a bite
              away!
            </Typography>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
