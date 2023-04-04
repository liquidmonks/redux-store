import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../../redux/productsSlice";
import Spinner from "../Sipnner";

function ProductList() {
  const products = useSelector((state) => state.products.products);
  const currentCategory = useSelector((state) => state.categories.currentCategory);
  const dispatch = useDispatch();

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch(updateProducts(data.products));

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((products) => {
        dispatch(updateProducts(products));
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return products;
    }

    return products.filter((product) => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {loading ? (
        <Spinner />
      ) : products.length ? (
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-content-center">
          {filterProducts().map((product) => (
            <ProductItem key={product._id} _id={product._id} image={product.image} name={product.name} price={product.price} quantity={product.quantity} />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
    </div>
  );
}

export default ProductList;
