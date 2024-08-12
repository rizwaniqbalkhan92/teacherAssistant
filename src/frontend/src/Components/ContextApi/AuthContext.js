import { useNavigate } from 'react-router-dom';
import React, { createContext, useReducer, useContext, useEffect } from 'react';

const initialState = {
  isAuthenticated: false,
  token: null,
  userId: null,
};


export const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SET_AUTH: 'SET_AUTH',
};


const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return { ...state, isAuthenticated: true, token: action.payload.token, userId: action.payload.userId };
    case ACTIONS.LOGOUT:
      return { ...state, isAuthenticated: false, token: null, userId: null };
    case ACTIONS.SET_AUTH:
      return { ...state, isAuthenticated: action.payload.isAuthenticated, token: action.payload.token, userId: action.payload.userId };
    default:
      return state;
  }
};

// Create Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    
  const [state, dispatch] = useReducer(authReducer, initialState);

useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    console.log('Retrieved from localStorage:', { token, userId });
  
    if (token && userId) {
      dispatch({ type: ACTIONS.SET_AUTH, payload: { isAuthenticated: true, token, userId } });
    }
  }, []);
  


const login = (token, userId) => {
    console.log('Login called with:', { token, userId });
    if (token && userId) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      dispatch({ type: ACTIONS.LOGIN, payload: { token, userId } });
    } else {
      console.error('Token or User ID is missing');
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    dispatch({ type: ACTIONS.LOGOUT });

  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
