import React from 'react';
import useStyles from "./styles";
import { Dialog, DialogContent, DialogTitle, Typography, CardMedia, IconButton, DialogActions } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";

const ProductDetails = ({ openPopup, setOpenPopup, product, addToCart }) => {
  const classes = useStyles();
  return (
    <Dialog open={openPopup} fullWidth>
      <DialogTitle>
        <Typography variant="h5">
          {product.name}
          <IconButton
            id="icon-close"
            className={classes.cardActions}
            area-label="Close"
            onClick={() => setOpenPopup(false)}
          >
            <CloseIcon />
          </IconButton>
        </Typography>
      </DialogTitle>
      <DialogContent>
        <div id="dialog-content">
          <CardMedia
            id="dialog-img"
            image={product.media.source}
            title={product.name}
          />
        </div>
          <Typography variant="h5" gutterBottom>
            Price: {product.price.formatted_with_symbol}
          </Typography>
          <Typography
            variant="h5"
            color="black"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        <DialogActions>
          <IconButton
            id="icon-add"
            className={classes.cardActions}
            area-label="Add to Cart"
            onClick={() => addToCart(product.id, 1)}
          >
            <AddShoppingCart />
          </IconButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
