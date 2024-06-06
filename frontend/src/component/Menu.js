import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Col, Row} from "reactstrap";

function Menu() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <Row>
                <Col md="6">
                    <Button color="success" onClick={() => handleNavigation('/home/PizzaMenu')}>Go to Pizzas</Button>
                </Col>
                <Col md="6">
                    <Button color="success" onClick={() => handleNavigation('/orderform')}>last orders</Button>
                </Col>
            </Row>
                       {/*<button onClick={() => handleNavigation('/drinks')}>Go to Drinks</button>*/}
        </>
    );
}

export default Menu;
