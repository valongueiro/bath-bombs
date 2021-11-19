import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Grid,
  Text,
} from "@chakra-ui/react";

const Cart = () => {
  const { checkout, isCartOpen, closeCart, removeLineItem } =
    useContext(ShopContext);

  return (
    <>
      <Drawer isOpen={isCartOpen} placement="right" onClose={closeCart}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton outline="none" />
          <DrawerHeader>You Shopping Cart</DrawerHeader>

          <DrawerBody>
            {checkout.lineItems &&
              checkout.lineItems.map((item) => (
                <Grid>
                  <Text>{item.title}</Text>
                </Grid>
              ))}
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="blue">Checkout</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Cart;
