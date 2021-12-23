import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import logoNav from '../../assets/logoNav.png';
import useStyles from './styles';

const NavBar = ({ total }) => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            color="inherit"
            component={Link}
            to="/"
          >
            <img
              src={logoNav}
              alt="Barca-Store"
              height="25px"
              className={classes.image}
            />
            Barca-Store
          </Typography>
          <div className={classes.grow} />
          {location.pathname === "/" && (
            <div className={classes.button}>
              <IconButton
                area-label="Show Cart Items"
                color="inherit"
                component={Link}
                to='/cart'
              >
                <Badge badgeContent={total} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
