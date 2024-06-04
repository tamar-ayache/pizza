import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

function OrderingDetails({}) {
    const location = useLocation();
    const { cartItems } = location.state || {};
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [timeOptions, setTimeOptions] = useState([]);
    const { addToCart } = useContext(GlobalContext);

    useEffect(() => {
        const now = new Date();
        const currentHour = now.getHours();
        let nextFullHour = currentHour + 1;
        if (now.getMinutes() > 0) {
            nextFullHour += 1;
        }
        nextFullHour = nextFullHour % 24;

        const options = [];
        for (let i = nextFullHour; i <= 24; i++) {
            const timeString = `${i.toString().padStart(2, '0')}:00`;
            options.push(timeString);
        }

        setTimeOptions(options);
        setArrivalTime(options[0]);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (phone.length !== 10) {
            alert('Phone number must be exactly 10 digits.');
            return;
        }
        if (firstName.trim() === '' || lastName.trim() === '') {
            alert('Please enter your full name.');
            return;
        }

        const orderDetails = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            address: {
                street: street.trim(),
                houseNumber: houseNumber.trim(),
                city: city.trim()
            },
            phone,
            arrivalTime,
            cartItems
        };

        addToCart(orderDetails);

        fetch('/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // אפשר להוסיף כאן קוד לטיפול בתגובה של השרת
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        console.log(JSON.stringify(orderDetails, null, 2));

        // You can send the orderDetails JSON to a server or save it as needed
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2>Order Details</h2>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="street">Street</Label>
                            <Input
                                type="text"
                                name="street"
                                id="street"
                                placeholder="Enter your street"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="houseNumber">House Number</Label>
                            <Input
                                type="text"
                                name="houseNumber"
                                id="houseNumber"
                                placeholder="Enter your house number"
                                value={houseNumber}
                                onChange={(e) => setHouseNumber(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="city">City</Label>
                            <Input
                                type="text"
                                name="city"
                                id="city"
                                placeholder="Enter your city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Phone</Label>
                            <Input
                                type="tel"
                                name="phone"
                                id="phone"
                                placeholder="Enter your phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="arrivalTime">Arrival Time</Label>
                            <Input
                                type="select"
                                name="arrivalTime"
                                id="arrivalTime"
                                value={arrivalTime}
                                onChange={(e) => setArrivalTime(e.target.value)}
                                required
                            >
                                {timeOptions.map((time, index) => (
                                    <option key={index} value={time}>{time}</option>
                                ))}
                            </Input>
                        </FormGroup>
                        <Button type="submit" color="primary">Sent order</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default OrderingDetails;
