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
      const addedProduct = action.payload;
      const _cartItem = state.cart.find(
        (c: CartItem, i: number) => c.product === addedProduct
      );
      if (_cartItem) {
        // 1. update the quantity

        // 2. replace the existing version of that cartItem with updated cartItem
        // 3. Then we return the state
        // _cartItem.quantity++; // example of updating cartItem directly from state

        // creating a new cart array with a map function
        // the map function is checking for the addedCartItem,
        // if it matches an item inside the cart array, update that item
        // else return the cartItem back to the array
        const updatedCart = state.cart.map((cartItem: CartItem) =>
          cartItem.product === addedProduct
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );

        return { ...state, cart: updatedCart };
      } else {
        // create a new cartItem
        const cartItem = {
          id: Math.floor(Math.random() * 100),
          quantity: 1,
          product: action.payload,
        };
        // add the new cartItem to our cart state

        return { ...state, cart: [...state.cart, cartItem] };
      }

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
