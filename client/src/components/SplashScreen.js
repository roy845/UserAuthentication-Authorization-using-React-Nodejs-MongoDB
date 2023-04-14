import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import logo from '../assets/images/logo.gif';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: theme.spacing(2),
  },
  text: {
    color: '#000',
  },
}));

const SplashScreen = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src = {logo} alt = "splash logo"></img>
  
      <CircularProgress />
    </div>
  );
};

export default SplashScreen;
