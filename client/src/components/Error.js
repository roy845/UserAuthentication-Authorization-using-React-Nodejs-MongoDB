import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
    fontSize: '3rem',
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: theme.spacing(4),
    fontSize: '1.5rem',
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing(2),
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
}));

const Error = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h1" color="error">
        Oops!
      </Typography>
      <Typography className={classes.subtitle} variant="h5" color="textSecondary">
        Something went wrong.
      </Typography>
      <Button className={classes.button} onClick={()=>navigate('/')} variant="contained" color="primary">
        Go back to homepage
      </Button>
    </div>
  );
};

export default Error;
