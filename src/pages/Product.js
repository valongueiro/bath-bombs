import { useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext";
import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
  GridItem,
  Image,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";

const Product = () => {
  const { fetchProductWithHandle, addItemToCheckout, product, checkout } =
    useContext(ShopContext);
  const { handle } = useParams();

  useEffect(() => {
    fetchProductWithHandle(handle);
  }, [fetchProductWithHandle, handle]);

  if (!product.title) return <p>Loading...</p>;

  return (
    <Box>
      <Grid templateColumns="repeat(2, 1fr)">
        <GridItem>
          <Image src={product.images[0].src} />
        </GridItem>
        <GridItem>
          <Heading>{product.title}</Heading>
          <Text>${product.variants[0].price}</Text>
          <Text>{product.description}</Text>
          <Button
            colorScheme="blue"
            onClick={() => {
              addItemToCheckout(product.variants[0].id, 1);
            }}
          >
            Add To Cart
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Product;
