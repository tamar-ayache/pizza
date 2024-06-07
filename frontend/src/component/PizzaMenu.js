import React, {useState, useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row, Col, Form} from 'reactstrap';
import {useNavigate} from 'react-router-dom';
import DoughType from "./DoughType";
import PizzaSize from "./PizzaSize";
import ToppingsSelector from "./ToppingsSelector";
import {GlobalContext} from './GlobalContext';
/**
 * PizzaMenu component allows users to customize and add a pizza to their cart.
 * It provides options for selecting dough type, pizza size, and toppings.
 */
function PizzaMenu() {
    const {addToCart} = useContext(GlobalContext);
    const [dough, setDough] = useState('');
    const [size, setSize] = useState('');
    const [toppings, setToppings] = useState([]);
    const navigate = useNavigate();
    const [urlToppings, setUrl] = useState('/api/toppings');
    const [previousDough, setPreviousDough] = useState('');
    const [previousSize, setPreviousSize] = useState('');
    const [previousToppings, setPreviousToppings] = useState([]);
    /**
     * Handles the selection of dough type.
     *
     * @param {string} dough - The selected dough type
     */
    const handleDoughType = (dough) => {
        setDough(dough);
    };
    /**
     * Handles the selection of pizza size.
     *
     * @param {string} size - The selected pizza size
     */
    const handleSize = (size) => {
        setSize(size);
    };
    /**
     * Handles the selection of toppings.
     *
     * @param {Array} toppings - The selected toppings
     */
    const handleToppings = (toppings) => {
        setToppings(toppings);
    };
    /**
     * Handles form submission to save pizza details and add to cart.
     *
     * @param {Event} e - The form submission event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (toppings.length > 0 && size !== '' && dough !== '') {
            const pizzaDetails = {
                dough: dough,
                size: size,
                toppings: toppings
            };

            // Save to server
            try {
                const response = await fetch('/api/pizzas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(pizzaDetails)
                });

                if (response.ok) {
                    const savedPizza = await response.json();
                    console.log("savedPizza"  +  savedPizza)
                    addToCart(savedPizza);
                    navigate('/home/cart', {state: {pizzaDetails: savedPizza}});
                } else {
                    alert('Error saving pizza details.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error saving pizza details.');
            }
        } else {
            alert('Please select all options before proceeding.');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Container>
                <Row>
                    <Col md="6">
                        <DoughType choose={handleDoughType} selected={dough} previousSelection={previousDough} />
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <PizzaSize choose={handleSize} selected={size} previousSelection={previousSize} />
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <ToppingsSelector url={urlToppings} choose={handleToppings} selected={toppings} previousSelection={previousToppings} />
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <Button color="success" type="submit">Add to Cart</Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}

export default PizzaMenu;
