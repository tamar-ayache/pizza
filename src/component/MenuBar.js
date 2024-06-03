import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PizzaMenu from "./PizzaMenu";
import DrinksMenu from "./DrinksMenu";
import MenuBar from "./MenuBar";
import { useNavigate } from 'react-router-dom';


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
