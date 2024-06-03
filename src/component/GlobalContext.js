import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
    cartItems: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const updatedCartItems = [...state.cartItems, action.payload];
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            return {
                ...state,
                cartItems: updatedCartItems
            };
        case 'LOAD_CART_ITEMS':
            return {
                ...state,
                cartItems: action.payload
            };
        case 'RESET_CART':
            localStorage.removeItem('cartItems');
            return {
                ...state,
                cartItems: []
            };
        case 'REMOVE_FROM_CART':
            const filteredCartItems = state.cartItems.filter((_, index) => index !== action.payload);
            localStorage.setItem('cartItems', JSON.stringify(filteredCartItems));
            return {
                ...state,
                cartItems: filteredCartItems
            };
        default:
            return state;
    }
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        dispatch({ type: 'LOAD_CART_ITEMS', payload: storedCartItems });
    }, []);

    const addToCart = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
    };
    const resetCart = () => {
        dispatch({ type: 'RESET_CART' });
    };

    const removeFromCart = (index) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: index });
    };

    return (
        <GlobalContext.Provider value={{ cartItems: state.cartItems, addToCart, resetCart, removeFromCart  }}>
            {children}
        </GlobalContext.Provider>
    );
};
