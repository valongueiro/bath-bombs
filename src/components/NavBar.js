import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { Link } from "react-router-dom";
import { Flex, Icon, Image } from "@chakra-ui/react";
import { MdMenu, MdOutlineShoppingCart } from "react-icons/md";

const NavBar = () => {
  const { openCart } = useContext(ShopContext);

  return (
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      p="1rem 2rem"
      backgroundColor="#FFA8E2"
    >
      <Icon as={MdMenu} fill="white" w={30} h={30} cursor="pointer" />
      <Link to="/">
        <Image
          src="https://cdn.shopify.com/s/files/1/0472/5705/9496/files/Logologo_1.svg?v=1610055540"
          w={100}
          h={100}
        />
      </Link>
      <Icon
        as={MdOutlineShoppingCart}
        fill="white"
        w={30}
        h={30}
        cursor="pointer"
        onClick={openCart}
      />
    </Flex>
  );
};

export default NavBar;
