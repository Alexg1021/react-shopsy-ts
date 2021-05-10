import React, { createContext, useState, useReducer } from 'react';
import instance from '../api/apiConfig';

// Initialize a default state for our app
const initialState = {
  products: [],
  cart: [],
  product: undefined,
  is_loading: false,
  getProducts: () => {},
  getSingleProduct: () => {},
  addToCart: () => {},
};

// Create our global reducer
// reducer is a function that allows us to handle and update state
/*
 - reducer will take an initial state
 - will receive an action declaration
 - will look to update our state based on the desired action
 - will return our updated state
 - our reducer takes two parameters. 
    - the first is our initialState so that we can update it accordingly
    - the second param is the action object that gets 
    - passed into dispatch({type:'some_action', payload:'some data'})
*/
const appReducer = (state: any, action: any) => {
  //   debugger;
  switch (action.type) {
    case 'GET_PRODUCTS':
      // when a case matches, the return will update the state for us
      return { ...state, products: action.payload, is_loading: false };
    case 'GET_SINGLE_PRODUCT':
      // when case matches, bind the payload to the product property in state
      return { ...state, product: action.payload, is_loading: false };
    case 'ADD_TO_CART':
      console.log('what is payload?', action.payload);
      return { ...state, cart: [...state.cart, action.payload] };
    case 'SET_LOADING':
      return { ...state, is_loading: action.payload };
    default:
      return state;
  }
};

// Create Context from react
export const GlobalContext = createContext<InitialStateType>(initialState);

// Create Global provider which will feed state to our components
export const GlobalProvider: React.FC = ({ children }) => {
  // useReducer is a react hook, to access and
  // update our state in our reducer function
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions = methods that run tasks for our app
  const getProducts = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      let { data } = await instance.get('/products');
      dispatch({ type: 'GET_PRODUCTS', payload: data });
    } catch (e) {
      console.log(e);
    }
  };

  const getSingleProduct = async (productId: number) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      let { data } = await instance.get(`/products/${productId}`);
      console.log(data);
      dispatch({ type: 'GET_SINGLE_PRODUCT', payload: data });
    } catch (e) {
      console.log(e);
    }
  };

  const addToCart = (product: Product) => {
    // receive a product that we can then move into our cart array
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <GlobalContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        product: state.product,
        is_loading: state.is_loading,
        getProducts,
        getSingleProduct,
        addToCart,
      }}>
      {children} {/* <AppRouter/> */}
    </GlobalContext.Provider>
  );
};
