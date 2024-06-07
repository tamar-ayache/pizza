// FloatingButton.js
import React from 'react';
import { Button } from 'reactstrap';
import './FloatingButton.css';
import { useNavigate } from 'react-router-dom';
/**
 * FloatingCartButton component renders a floating button that navigates to the cart page when clicked.
 *
 * @param {Object} props - The component props
 * @param {Function} props.onClick - The callback function to handle button clicks (if needed)
 */

const FloatingCartButton = ({ onClick }) => {
    const navigate = useNavigate();

    return (
        <div className="floating-button">
            <Button color="primary" onClick={() => navigate('/home/cart')}>
                <img src="/images/cartIcon.png" alt="Cart"/>
            </Button>
        </div>
    );
};

export default FloatingCartButton;
