import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import ProductItem from '../components/ProductItem';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <div className="container mx-auto px-2 py-5">
        <Link to="/" className='link'>← Back to Products</Link>

        {user ? (
          <div className='mt-5'>
            <h2 className='mb-10'>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="mb-10">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <ProductItem
                      key={_id}
                      _id={_id}
                      image={image}
                      name={name}
                      price={price}
                      canAdd={false}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default OrderHistory;
