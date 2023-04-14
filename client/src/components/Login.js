import React,{ useState,useEffect } from "react";
import '../styles/cursorStyles.css'
import { Avatar, Button, CssBaseline, TextField, Grid,Link, Typography, Container } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate,useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {faCheck,faTimes} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import '../styles/cursorStyles.css'
import '../styles/errorStyles.css'
import '../styles/successStyles.css'
const LOGIN_URL = '/auth';

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

const Login = () => {

    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const { setAuth, persist, setPersist,setIsLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    let from = '/dashboard'
    if (location.state && location.state.from && location.state.from.pathname) {
      from = location.state.from.pathname
    }
  

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

      if(!email || !password){
        onAlert('Fill in all the details','error');
      }

      try{

        const response = await axios.post(LOGIN_URL,JSON.stringify({user:email,pwd:password}),
        {
          headers:{"Content-Type":'application/json'},
          withCredentials:true
        });

        if(response.data)
            console.log(response.data);
          
        const accessToken = response.data.accessToken;
        const roles = response.data.roles;
        
        setIsLoading(true);
        setAuth({email,password,roles,accessToken});
      
        setEmail('');
        setPassword('');
        navigate(from ,{replace:true});

      }catch(err){
        if(!err || !err.response){
          onAlert('No Server Response','error');
        }else if(err.response && err.response.status === 400){
          onAlert('Missing Username or Password','error');
        }else if(err.response && err.response.status === 401){
          onAlert('Unauthorized','error');
        }else{
          onAlert('Login Failed','error');
        }
      }  
};

    const togglePersist = () => {
      setPersist(prev => !prev);
    }

    useEffect(() => {
      localStorage.setItem("persist", persist);
    }, [persist])
      
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
                )
                :
                <span className="success">   
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
              autoComplete="current-password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled = {!isValidEmail||!password}
            >
              Sign In
            </Button>

            <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
            <Grid container>
              <Grid item xs>
                <Link onClick={()=>navigate('/forgotpassword')} variant="body2" className = "link-cursor" >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={()=>navigate('/signup')}  className = "link-cursor" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
}


export default Login;