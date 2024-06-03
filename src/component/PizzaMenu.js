import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Form } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import DoughType from "./DoughType";
import PizzaSize from "./PizzaSize";
import ToppingsSelector from "./ToppingsSelector";
import { GlobalContext } from './GlobalContext';

function PizzaMenu() {
    const { addToCart } = useContext(GlobalContext);
    const [dough, setDough] = useState('');
    const [size, setSize] = useState('');
    const [toppings, setToppings] = useState([]);
    const navigate = useNavigate();

    const handleDoughType = (dough) => {
        setDough(dough);
    };

    const handleSize = (size) => {
        setSize(size);
    };

    const handleToppings = (toppings) => {

        setToppings(toppings);
        console.log(toppings)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (toppings.length > 0 && size !== '' && dough !== '') {
            const pizzaDetails = {
                name: `Pizza with ${dough} dough, ${size} size, and ${toppings.join(', ')} toppings`,
                dough: dough,
                size: size,
                toppings: toppings
            };
            addToCart(pizzaDetails);
            navigate('/home/cart', { state: { pizzaDetails } });
        } else {
            alert('Please select all options before proceeding.');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Container>
                <Row>
                    <Col md="6">
                        <DoughType choose={handleDoughType} />
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <PizzaSize choose={handleSize} />
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <ToppingsSelector choose={handleToppings} />
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
