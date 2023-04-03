import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import store from './redux/store'
import { Provider } from 'react-redux'

// Create a HTTP link for the Apollo client
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Create an authentication link for the Apollo client
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create an instance of the Apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// The main application component
function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <>
            <Nav />
            <Routes>
              {
                routes.map((r, i) => <Route key={i} path={r.path} element={r.element} />)
              }
            </Routes>
          </>
        </Router>
      </Provider>
    </ApolloProvider>
  );
}

// An array of routes
const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/success',
    element: <Success />
  },
  {
    path: '/orderHistory',
    element: <OrderHistory />
  },
  {
    path: '/products/:id',
    element: <Detail />
  },
  {
    path: '*',
    element: <NoMatch />
  },
]

export default App;
