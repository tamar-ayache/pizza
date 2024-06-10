import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './GlobalContext';
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import { useNavigate } from "react-router-dom";

/**
 * Cart component displays the items in the user's cart and provides functionalities
 * to remove items, reset the cart, and navigate to other pages.
 */
const Cart = () => {
    const { cartItems, resetCart, removeFromCart } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [price, setPrice] = useState(0);
    const basePizzaPrice = 40; // מחיר בסיסי של הפיצה
    const toppingPrice = 3; // מחיר עבור תוספת

    /**
     * Handles the removal of an item from the cart.
     * @param {number} index - The index of the item to remove.
     */
    const handleRemoveItem = async (index) => {
        const itemToRemove = cartItems[index];
        await fetch(`/api/order/${itemToRemove.orderId}`, {
            method: 'DELETE'
        });
        removeFromCart(index);
        updatePrice();
    };

    /**
     * Updates the total price of the items in the cart.
     */
    const updatePrice = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            let itemPrice = basePizzaPrice; // מחיר בסיסי של הפיצה

            // רק אם יש תוספות, נחשב את מחירן
            if (item.toppings[0] !== "no topping") {
                itemPrice += item.toppings.length * toppingPrice; // חישוב מחיר התוספות
            }

            totalPrice += itemPrice;
        });
        setPrice(totalPrice);
    };

    useEffect(() => {
        updatePrice();
    }, [cartItems]);

    return (
        <>
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <Card key={index} className="mb-3" style={{backgroundColor: "#ADD8E6"}}>
                            <CardBody>
                                <CardTitle tag="h5">Pizza Details</CardTitle>
                                <CardText>
                                    <p className="text-muted">Dough: {item.dough}</p>
                                    <p className="text-muted">Size: {item.size}</p>
                                    <p className="text-muted">Toppings: {item.toppings && item.toppings.length > 0 && item.toppings[0] !== "No toppings selected"
                                        ? item.toppings.join(', ')
                                        : 'No toppings selected'}</p>
                                    <p>Price: {basePizzaPrice + (item.toppings[0] !== "no topping" ? item.toppings.length * toppingPrice : 0)}</p>
                                </CardText>
                                <Button color="danger" onClick={() => handleRemoveItem(index)}>
                                    Delete
                                </Button>
                            </CardBody>
                        </Card>
                    ))}
                </ul>
            )}

            <p>Total Order Price: {price}</p>

            <Button color="danger" onClick={resetCart}>
                Delete All
            </Button>
            <Button color="primary" onClick={() => navigate("/home/PizzaMenu")}>
                Add new item
            </Button>
            <Button color="success" onClick={() => navigate('/home/PizzaMenu/OrderingDetails', { state: { cartItems } })}>
                Details and payment
            </Button>
        </>
    );
};

export default Cart;
