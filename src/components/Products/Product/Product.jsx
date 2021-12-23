import React, { useState } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import MoreIcon from "@material-ui/icons/More";
import useStyles from './styles';

import ProductDetails from "../ProductDetails/ProductDetails";

const Product = ({ product, addToCart }) => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={product.media.source}
          title={product.name}
        />
        <CardContent>
          <div className={classes.cardContent}>
            <Typography variant="h5" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {product.price.formatted_with_symbol}
            </Typography>
          </div>
          <Typography
            variant="body2"
            color="textSecondary"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <IconButton
            area-label="More details"
            onClick={() => setOpenPopup(true)}
          >
            <MoreIcon />
          </IconButton>
          <IconButton
            area-label="Add to Cart"
            onClick={() => addToCart(product.id, 1)}
          >
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </Card>
      <ProductDetails
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        product={product}
        addToCart={addToCart}
      />
    </div>
  );
};

export default Product;
