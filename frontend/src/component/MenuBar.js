import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PizzaMenu from "./PizzaMenu";
import DrinksMenu from "./DrinksMenu";
import MenuBar from "./MenuBar";
import { useNavigate } from 'react-router-dom';
/**
 * Menubar component provides navigation buttons to different menus.
 * It uses React Router for navigation and Bootstrap for styling.
 */

function Menubar() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <button onClick={() => handleNavigation('/pizzas')}>Go to Pizzas</button>
            <button onClick={() => handleNavigation('/drinks')}>Go to Drinks</button>
        </>
    );
}

export default Menubar;
