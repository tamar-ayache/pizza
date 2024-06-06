import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './GlobalContext';
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { cartItems, resetCart, removeFromCart } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [price, setPrice] = useState(0);

    const handleRemoveItem = async (index) => {
        const itemToRemove = cartItems[index];
        await fetch(`/api/order/${itemToRemove.orderId}`, {
            method: 'DELETE'
        });
        removeFromCart(index);
        updatePrice();
    };

    const updatePrice = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += 40 + item.toppings.length * 3;
        });
        setPrice(totalPrice);
    };

    useEffect(() => {
        updatePrice();
    }, [cartItems]);

    const handleOrder = async () => {
        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cartItems, totalPrice: price }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Order saved:', data);
                navigate('/orderform/' + data.orderId);
            } else {
                console.error('Failed to save order');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <Card key={index} className="mb-3" style={{ backgroundColor: "#ADD8E6" }}>
                            <CardBody>
                                <CardTitle tag="h5">Pizza Details</CardTitle>
                                <CardText>
                                    <p className="text-muted">Dough: {item.dough}</p>
                                    <p className="text-muted">Size: {item.size}</p>
                                    <p className="text-muted">Toppings: {item.toppings && item.toppings.length > 0
                                        ? item.toppings.join(', ')
                                        : 'No toppings selected'}</p>
                                </CardText>
                                <Button color="danger" onClick={() => handleRemoveItem(index)}>
                                    Delete
                                </Button>
                            </CardBody>
                        </Card>
                    ))}
                </ul>
            )}
            <p>Total price: {price}</p>

            <Button color="danger" onClick={resetCart}>
                Delete All
            </Button>
            <Button color="primary" onClick={() => navigate("/home/PizzaMenu")}>
                Add new item
            </Button>
            <Button color="success" onClick={handleOrder}>
                Details and payment
            </Button>
        </>
    );
};

export default Cart;
