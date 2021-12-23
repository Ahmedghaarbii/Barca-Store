import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavBar, Products, Cart, Checkout } from "./components";
import { commerce } from "./lib/commerce";

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [product, setProduct] = useState([])

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const addToCart = async (productId, qte) => {
    const item = await commerce.cart.add(productId, qte);
    setCart(item.cart);
  };

  const updateQte = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });
    setCart(response.cart);
  };

  const removeFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);
    setCart(response.cart);
  };

  const emptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <CssBaseline />
        <NavBar
          total={cart.total_items}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Switch>
          <Route exact path="/">
            <Products products={products} addToCart={addToCart} />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              updateQte={updateQte}
              removeFromCart={removeFromCart}
              emptyCart={emptyCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout
              cart={cart}
              onCaptureCheckout={handleCaptureCheckout}
              handleDrawerToggle={handleDrawerToggle}
              order={order}
              error={errorMessage}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
