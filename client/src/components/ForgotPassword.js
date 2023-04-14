import React, { useState } from "react";
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, Container } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {faCheck,faTimes} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../styles/cursorStyles.css'
import '../styles/errorStyles.css'
import '../styles/successStyles.css'
import axios from '../api/axios';
const FORGOT_PASSWORD_URL = '/forgot-password';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  const navigate = useNavigate();

  const onAlert = (message, variant) => {
    enqueueSnackbar (message, {variant});
  };

  const handleEmailChange = (e)=> {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsValidEmail(validEmailRegex.test(inputEmail));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{

      const response = await axios.post(FORGOT_PASSWORD_URL,JSON.stringify({email}),
      {
        headers:{"Content-Type":'application/json'},
      });

      if(response)
        console.log(response);
        
  
    
      setEmail('');
      onAlert('Mail with all the details on how to reset your password sent','success');

    }catch(err){
      //console.log(err);
      if(!err || !err.response){
        onAlert('No Server Response','error');
      }else if(err.response && err.response.status === 400){
        onAlert(err.response.data.message,'error');
      }else{
        onAlert('Send Mail Failed','error');
      }
    }  


  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot password
        </Typography>
        <p>Please enter the email address associated with your account. We'll send you a password reset link to this email.</p>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
          />
            <Typography variant="caption">
            {email === '' ? null : !isValidEmail ? (
               <span className="error">   
               <FontAwesomeIcon className="icon" icon = {faTimes}/>
               <span className="text">{'Invalid email address'}</span>    
               </span>
                )
                :
                <span className="success">   
                <FontAwesomeIcon className="icon" icon = {faCheck}/>
                <span className="text">{'Valid email address'}</span>    
                </span>
                }
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled = {!isValidEmail||!email}
          >
            Reset Password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link onClick={() => navigate('/')} className = "link-cursor"  variant="body2">
                Back to Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default ForgotPassword;
