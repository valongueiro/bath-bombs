import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";

const Home = () => {
  const { fetchAllProducts, products } = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  if (!products) return <p>Loading...</p>;

  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {products.map((product) => (
          <Link key={product.id} to={`/products/${product.handle}`}>
            <GridItem _hover={{ opacity: "80%" }} textAlign="center">
              <Image src={product.images[0].src} alt={product.title} />
              <Text>{product.title}</Text>
              <Text>${product.variants[0].price}</Text>
            </GridItem>
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
