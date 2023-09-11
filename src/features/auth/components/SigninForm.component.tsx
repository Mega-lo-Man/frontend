import { FC, FormEvent, useEffect } from 'react';
import {
  Box, 
  Grid, 
  TextField, 
  InputLabel, 
  Typography, 
  Button, 
  Divider,
  CircularProgress, 
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../../../hooks/input/use-input';
import { validateEmail } from '../../../shared/utils/validation/email';
import { validatePasswordLength } from '../../../shared/utils/validation/length';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
import { login, reset } from '../authSlice';
import { LoginUser } from '../../models/LoginUser.interface';

const SigninFormComponent: FC = () => {
  const {
    text: email,
    shouldDisplayError: emailHasError,
    textChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearHandler: emailClearHandler,
  } = useInput(validateEmail);

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    clearHandler: passwordClearHandler,
  } = useInput(validatePasswordLength);

  const clearForm = () => {
    emailClearHandler();
    passwordClearHandler();
  }

  const dispatch = useAppDispatch();

  const {isLoading, isSuccess, isAuthenticated} = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if(isSuccess) {
      dispatch(reset());
      clearForm();
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if(!isAuthenticated)
      return;
    navigate('/');
  }, [isAuthenticated, navigate]);
  
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      emailHasError ||
      passwordHasError
    )
      return;

    if (
      email.length === 0 ||
      password.length === 0
    )
      return;

    const loginUser: LoginUser = { email, password };

    dispatch(login(loginUser));
  }

  if(isLoading) return <CircularProgress sx={{ marginTop: '64px' }} color='primary'/>
  
  return(
    <>
      <Box 
        sx={{
          border: 1, 
          padding: 2,
          borderColor: '#CCCCCC',
          width: '350px',
          marginTop: 2,
        }}>
        <form onSubmit={onSubmitHandler}>
          <Grid 
            container direction={'column'} 
            justifyContent='flex-start'
          >
            <Typography 
              variant='h4' 
              component='h1'
            >
              Sign-In 
            </Typography>

            <InputLabel
              sx={{ 
                fontWeight: 500,
                marginTop: 1,
                color: '#000000',
              }}
              htmlFor='name'
            >
              Email
            </InputLabel> 

            <TextField
              value={email}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              error={emailHasError}
              helperText={emailHasError ? 'Enter your email' : ''}
              type='email'
              name='email'
              id='email'
              variant='outlined'
              size='small'
            />

            <InputLabel
              sx={{ 
                fontWeight: 500,
                marginTop: 1,
                color: '#000000',
              }}
              htmlFor='password'
            >
              Password
            </InputLabel> 

            <TextField
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              error={passwordHasError}
              helperText={passwordHasError ? 'Minimum 6 characters required' : ''}
              type='password'
              name='password'
              id='password'
              variant='outlined'
              size='small'
              placeholder='Minimum 6 characters required'
            />

            <Button
              
              disabled={ !validatePasswordLength(password) || !validateEmail(email) }
              type='submit'
              variant='contained'
              style={{
                margin: '16px',
                height: '31px',
                backgroundColor: '#F0C14B',
                color: 'black',
                borderColor: '#A88734 #9C7E31 #846A29',
                textTransform: 'none',
              }}
            >
              Sign-In
            </Button>
          </Grid>
        </form>

        <div style={{marginTop: '30px'}}>
          <small>
            <span>
              By continuing, you agree to 
            </span>
          </small>
        </div>

        <div>
          <small>
            <span>
              <a href="#" style={{textDecoration: 'none'}}>{' '}Conditions of use</a>
              {' '}and{' '}
              <a href="#" style={{textDecoration: 'none'}}>Privacy policy</a>
            </span>
          </small>
        </div>
      </Box>
      <div style={{marginTop: '36px', marginBottom: '36px'}}>
        <Divider>
          <small style={{color: '#767676'}}>
              New to our company?
          </small>
        </Divider>
        <div>
          <Link to={'/register'} style={{textDecoration: 'none', color: '#0000EE'}}>
            <Button 
              id='register-link'
              variant='contained'
              style={{
                width: '100%',
                marginTop: '12px',
                height: '31px',
                backgroundColor: '#F1F1F1',
                color: 'black',
                textTransform: 'none',
              }}
            >
              Register
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default SigninFormComponent