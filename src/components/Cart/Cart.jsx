import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from "react-router-dom";
import useStyles from './styles';
import CartItem from './CartItem/CartItem';

const Cart = ({ cart, updateQte, removeFromCart, emptyCart }) => {
  const classes = useStyles();

  const EmptyCard = () => (
    <Typography variant="h4">
      Your cart is empty, Want to <Link className={classes.link} to='/'> add some </Link>?
    </Typography>
  );

  const FilledCard = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <CartItem
              item={item}
              updateQte={updateQte}
              removeFromCart={removeFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Total: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={emptyCart}
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            component={Link}
            to="/checkout"
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart.line_items) return 'Loading.......'

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Shopping Cart
      </Typography>
      {!cart.line_items.length ?
        <EmptyCard />
        : 
        <FilledCard />
      }
    </Container>
  );
}

export default Cart;
