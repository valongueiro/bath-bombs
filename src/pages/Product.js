import { useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext";
import { useParams } from "react-router-dom";

const Product = () => {
  const { fetchProductWithHandle, addItemToCart, product } =
    useContext(ShopContext);
  const { handle } = useParams();

  useEffect(() => {
    fetchProductWithHandle(handle);
  }, [fetchProductWithHandle, handle]);

  if (!product.title) return <p>Loading...</p>;

  return <div>{product.title}</div>;
};

export default Product;
