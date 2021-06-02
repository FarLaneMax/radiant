import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Auth/Login/index.js';
import SignUp from './components/Auth/SignUp/index.js';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Splash from './components/Splash';
import Home from './components/Home';
import Products from './components/Products';
import Product from './components/Product';
import Footer from './components/Footer';
import { authenticate } from './store/session';

function App() {
  const user = useSelector(state => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  let sessionLinks;
  if (user) {
    sessionLinks = <Home />
  } else {
    sessionLinks = <Splash />
  }

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <Login />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUp />
        </Route>
        <Route path='/' exact={true}>
          {sessionLinks}
        </Route>
        <ProtectedRoute path='/products' exact={true}>
          <Products />
        </ProtectedRoute>
        <ProtectedRoute path={'/products/:id'} exact={true}>
          <Product />
        </ProtectedRoute>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
