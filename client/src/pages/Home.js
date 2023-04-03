import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container mx-auto px-2 py-5">
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
