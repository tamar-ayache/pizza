import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import SupportBar from "./SupportBar";
import AboutAs from "./AboutAs";
import ContactAs from "./ContactAs";
import HomePage from "./HomePage";
import PizzaMenu from "./PizzaMenu";
import OrderingDetails from "./OrderingDetails";
import FloatingCartButton from "./FloatingCartButton";
import {GlobalProvider} from "./GlobalContext";
import Cart from "./Cart";
import OrderDetailsForm from "./OrderDetailsForm";
import UpdatePizza from "./UpdatePizza";
// import OrderDetails from './OrderDetails';
function Support() {
    const handleCartClick = () => {
        alert("Cart button clicked!");
        // You can replace the alert with navigation or a modal opening
    };
    return (
        <BrowserRouter>
            <GlobalProvider>
                <SupportBar/>
                <FloatingCartButton onClick={handleCartClick}/>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home"/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/about" element={<AboutAs/>}/>
                    <Route path="/contact" element={<ContactAs/>}/>
                    <Route path="/home/PizzaMenu" element={<PizzaMenu/>}/>
                    <Route path="/home/PizzaMenu/OrderingDetails" element={<OrderingDetails/>}/>
                    <Route path="/home/cart" element={<Cart/>}/>
                    {/*<Route path="/order" element={<OrderingDetails />} />*/}
                    <Route path="/orderform/:orderId" element={<OrderDetailsForm urlToppings={'/api/toppings'}/>} />
                    <Route path="/home/pizza/update/:pizzaId" element={<UpdatePizza />} />

                </Routes>
            </GlobalProvider>
        </BrowserRouter>
    );
}

export default Support;
