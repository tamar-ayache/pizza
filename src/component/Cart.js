import React, {useContext} from 'react';
import {GlobalContext} from './GlobalContext';
import {Button, Card, CardBody, CardText, CardTitle} from "reactstrap";
import {useNavigate} from "react-router-dom";

const Cart = () => {
    const {cartItems, resetCart, removeFromCart} = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleRemoveItem = (index) => {
        removeFromCart(index);
    };

    return (
        <>
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <Card className="mb-3" style={{ backgroundColor: "#ADD8E6" }}>
                            <CardBody>
                                <CardTitle tag="h5">Pizza Details</CardTitle>
                                <CardText>
                                    <p className="text-muted">Dough: {item.dough}</p>
                                    <p className="text-muted">Size: {item.size}</p>
                                    <p className="text-muted">Toppings: {item.toppings && item.toppings.length > 0
                                        ? item.toppings.join(', ')
                                        : 'No toppings selected'}</p>
                                </CardText>
                                <Button color="danger" onClick={() => removeFromCart(index)}>
                                    Delete
                                </Button>
                            </CardBody>
                        </Card>




                    ))}
                </ul>
            )}
            <Button color="danger" onClick={resetCart}>
                Delete All
            </Button>
            <Button color="primary" onClick={() => navigate("/home/PizzaMenu")}>
                Add new item
            </Button>
            <Button color="success" onClick={() => navigate('/home/PizzaMenu/OrderingDetails', {state: {cartItems}})}>
                Details and payment
            </Button>
        </>
    );
};

export default Cart;
