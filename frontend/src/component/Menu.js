import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button} from "reactstrap";

function Menu() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <Button color="success" onClick={() => handleNavigation('/home/PizzaMenu')}>Go to Pizzas</Button>
            {/*<button onClick={() => handleNavigation('/drinks')}>Go to Drinks</button>*/}
        </>
    );
}

export default Menu;
