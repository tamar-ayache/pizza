// FloatingButton.js
import React from 'react';
import { Button } from 'reactstrap';
import './FloatingButton.css';
import { useNavigate } from 'react-router-dom';


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
