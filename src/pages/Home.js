import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/shopContext";

const Home = () => {
  const { fetchAllProducts, products } = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  if (!products) return <p>Loading...</p>;

  return (
    <div>
      {products.map((product) => (
        <Link key={product.id} to={`/products/${product.handle}`}>
          {product.title}
        </Link>
      ))}
    </div>
  );
};

export default Home;
