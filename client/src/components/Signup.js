import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {faCheck,faTimes} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../styles/cursorStyles.css'
import '../styles/errorStyles.css'
import '../styles/successStyles.css'

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import axios from '../api/axios';

const REGISTER_URL = '/register';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Signup = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmedPasswordValid, setIsConfirmedPasswordValid] = useState(false);
  const [validationResults, setValidationResults] = useState({});


     // Define an object that stores the validation criteria and their respective regex patterns
     const validationCriteria = {
      "At least 8 characters long": /^.{8,}$/,
      "Contains at least one uppercase letter": /^(?=.*[A-Z]).+$/,
      "Contains at least one lowercase letter": /^(?=.*[a-z]).+$/,
      "Contains at least one number": /^(?=.*\d).+$/,
      "Contains at least one special character [#?!@$%^&*-]": /^.*[#?!@$%^&*\-~+-]+.*$/
    }

   

   const {enqueueSnackbar} = useSnackbar();

  const navigate = useNavigate();

  const onAlert = (message, variant) => {
    enqueueSnackbar (message, {variant});
  };

  const validatePassword=(password)=> {
     const validation = {};
    // Check each validation criteria against the password and store the result in an object
    Object.entries(validationCriteria).forEach(([criteria, regex]) => {
      validation[criteria] = password === '' ? false:regex.test(password);

    });

    setValidationResults(validation);
   
  
    // Determine if all validation criteria are met
    const isValid = Object.values(validation).every((result) => result===true);
    return isValid;
  }

  const handlePasswordChange=(e)=> {
 
    setPassword(e.target.value);
    setIsPasswordValid(validatePassword(e.target.value));
    setIsConfirmedPasswordValid(confirmPassword ===  e.target.value);
  }

  const handleConfirmPasswordChange=(e)=> {
  
    setConfirmPassword(e.target.value);
    setIsConfirmedPasswordValid(password === e.target.value);
  }

  const handleEmailChange = (e)=> {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsValidEmail(validEmailRegex.test(inputEmail));
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!isValidEmail || !isPasswordValid || !isConfirmedPasswordValid){
      onAlert('Invalid Entry','error');
    }

    try{  
      const response = await axios.post(REGISTER_URL,JSON.stringify({user:email,pwd:password}),{
        headers:{'Content-Type':'application/json'},
        withCredentials:true,
      });
      console.log(response);
      
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate('/');
    }catch(err){
      if(!err || !err.response){
        onAlert('No Server Response','error');
      }else if(err.response && err.response.status === 409){
        onAlert('Username Already exists','error');
      }else{
        onAlert('Registration Failed','error');
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
          Sign up
        </Typography>
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
            ) : <span className="success">       
             <FontAwesomeIcon className="icon" icon = {faCheck}/>
             <span className="text">{'Valid email address'}</span>        
                </span>  
               }
            </Typography>
     
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={handlePasswordChange}
          />
          {password && (
        <Typography variant="caption">
          {Object.entries(validationCriteria).map(([criteria, _]) => (
            <span key={criteria}>
              {validationResults[criteria] ? 
              
              <span className="success">
              <span className="icon"><FontAwesomeIcon icon = {faCheck}/></span>  
              
              <span className="text">{criteria}</span>
              
              </span> 
              :
              <span className="error">
                 <span className="icon"><FontAwesomeIcon icon = {faTimes}/></span>   
                 <span className="text">{criteria}</span>

              </span>}
              
            </span>
          ))}
        </Typography>
      )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {confirmPassword && (
         <Typography variant="caption">
          {isConfirmedPasswordValid ?
           
           <span className="success">
           <span className="icon"><FontAwesomeIcon icon = {faCheck}/></span>  
           
           <span className="text">{'Passwords match'}</span>
           
           </span> 
          : 
          <span className="error">
                 <span className="icon"><FontAwesomeIcon icon = {faTimes}/></span>   
                 <span className="text">{'Passwords Don\'t match'}</span>

              </span>}
          
          </Typography>
      )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isPasswordValid||!isValidEmail||!isConfirmedPasswordValid}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link onClick={()=>navigate('/')} className = "link-cursor"  variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Signup;
