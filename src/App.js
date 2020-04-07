import React, { useReducer, useEffect, useRef } from 'react';
import { verifyLogin } from './service';
import loginReducer from './reducer';

const initialState = {
  username: '',
  password: '',
  isLoading: false,
  isLoggedIn: false,
  error: ''
};

const LoginComponent = () => {

  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { username, password, isLoading, isLoggedIn, error, isFocused } = state;
  const usernameRef = useRef(null);

  
  const Submit = async (event) => {
    event.preventDefault();
    dispatch({ type: 'login' });
    
    try {
      await verifyLogin({ username, password });
      dispatch({ type: 'success' });
    } catch (error) {
      dispatch({ type: 'error' });
    }
  };

  useEffect(() => {
    if (isFocused) {
      usernameRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div className="container">
      <div>
        {isLoggedIn ? (
          <>
            <h1>Welcome {username}!</h1>
            <button onClick={() => dispatch({ type: 'logout' })}>
              Log Out
            </button>
          </>
        ) : (
          <form onSubmit={Submit}>
            {error && <p className="error">{error} </p>}
            <h3 className="cl-pink">Login form</h3>
            <label >User Name</label>
            <input
              type="text"
              ref={usernameRef}
              value={username}
              autoFocus
              onChange={event =>
                dispatch({
                  type: 'field',
                  fieldName: 'username',
                  payload: event.currentTarget.value
                })
              }
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={event =>
                dispatch({
                  type: 'field',
                  fieldName: 'password',
                  payload: event.currentTarget.value
                })
              }
            />
            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Log In'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}


export default LoginComponent;