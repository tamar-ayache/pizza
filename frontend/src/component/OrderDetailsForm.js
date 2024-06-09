import React, { useState, useEffect } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Container,
    Row,
    Col
} from 'reactstrap';
import DoughType from "./DoughType";
import PizzaSize from "./PizzaSize";
import ToppingsSelector from "./ToppingsSelector";

function OrderDetailsForm() {
    const [orderId, setOrderId] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedItem, setEditedItem] = useState(null);
    const [editedItemIndex, setEditedItemIndex] = useState(null);
    const [dough, setDough] = useState('');
    const [size, setSize] = useState('');
    const [toppings, setToppings] = useState([]);
    const [urlToppings, setUrl] = useState('/api/toppings');
    const [previousDough, setPreviousDough] = useState('');
    const [previousSize, setPreviousSize] = useState('');
    const [previousToppings, setPreviousToppings] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Calculate total price whenever order details change
        calculateTotalPrice();
    }, [orderDetails]);

    const calculateTotalPrice = () => {
        let price = 0;
        if (orderDetails && orderDetails.cartItems) {
            orderDetails.cartItems.forEach(item => {
                price += calculateItemPrice(item);
            });
        }
        setTotalPrice(price);
    };

    const calculateItemPrice = (item) => {
        // Add logic to calculate item price based on dough, size, toppings, etc.
        let price = 40;

        // Add logic for toppings price if applicable
        if (item.toppings && item.toppings.length > 0 && item.toppings[0] !== "no topping") {
            price += item.toppings.length * 3;
        }
        return price;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`/api/order/${orderId}`)
            .then(response => response.json())
            .then(data => {
                setOrderDetails(data);
            })
            .catch(error => {
                console.error('Error fetching order details:', error);
            });
    };

    const handleDoughType = (dough) => {
        setDough(dough);
    };

    const handleSize = (size) => {
        setSize(size);
    };

    const handleToppings = (toppings) => {
        setToppings(toppings);
    };

    const handleEdit = (item, index) => {
        setEditedItemIndex(index);
        setEditedItem(item);
        setDough(item.dough);
        setSize(item.size);
        setToppings(item.toppings);
        setPreviousDough(item.dough);
        setPreviousSize(item.size);
        setPreviousToppings(item.toppings);
        setEditModalOpen(true);
    };

    const toggleEditModal = () => {
        setEditModalOpen(!editModalOpen);
    };

    const handleSaveChanges = () => {
        if (!dough || !size) {
            const confirmDelete = window.confirm("One or more fields are empty. Are you sure you want to delete this order?");
            if (confirmDelete) {
                deleteOrder();
            }
            return;
        }

        const updatedCartItems = Array.isArray(orderDetails.cartItems) ? [...orderDetails.cartItems] : [];
        if (editedItemIndex !== null) {
            updatedCartItems[editedItemIndex] = {
                ...updatedCartItems[editedItemIndex],
                dough: dough,
                size: size,
                toppings: toppings.length > 0 ? toppings : ['no topping']
            };
        } else {
            updatedCartItems.push({
                dough: dough,
                size: size,
                toppings: toppings.length > 0 ? toppings : ['no topping']
            });
        }

        const updatedOrderDetails = {
            ...orderDetails,
            cartItems: updatedCartItems
        };

        fetch(`/api/order/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedOrderDetails)
        })
            .then(response => {
                if (response.ok) {
                    setOrderDetails(updatedOrderDetails);
                    toggleEditModal();
                } else {
                    alert('Error updating order.');
                }
            })
            .catch(error => {
                console.error('Error updating order:', error);
            });
    };

    const deleteOrder = () => {
        fetch(`/api/order/${orderId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setOrderDetails(null);
                    toggleEditModal();
                } else {
                    alert('Error deleting order.');
                }
            })
            .catch(error => {
                console.error('Error deleting order:', error);
            });
    };

    return (
        <div style={{
            textAlign: 'center',
            maxWidth: '600px',
            margin: 'auto',
            fontFamily: 'Arial, sans-serif',
            color: '#333'
        }}>
            <h1 style={{marginBottom: '30px', color: '#FF6F61'}}>Order Details</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="orderIdInput" style={{color: '#FF6F61'}}>Enter Order ID:</Label>
                    <Input
                        type="text"
                        name="orderId"
                        id="orderIdInput"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                        style={{maxWidth: '300px', margin: 'auto', display: 'block'}}
                    />
                </FormGroup>
                <Button type="submit" color="danger"
                        style={{marginTop: '20px', backgroundColor: '#FF6F61', border: 'none'}}>Get Order
                    Details</Button>
            </Form>
            {orderDetails && (
                <div style={{marginTop: '40px', borderTop: '2px solid #FF6F61', paddingTop: '20px'}}>
                    <h2 style={{color: '#FF6F61'}}>Customer Details</h2>
                    <p><strong>First Name:</strong> {orderDetails.firstName}</p>
                    <p><strong>Last Name:</strong> {orderDetails.lastName}</p>
                    <p>
                        <strong>Address:</strong> {orderDetails.address.city} {orderDetails.address.street} {orderDetails.address.houseNumber}
                    </p>
                    <p><strong>Arrival Time:</strong> {orderDetails.arrivalTime}</p>
                    <h2 style={{marginTop: '30px', color: '#FF6F61'}}>Selected Items</h2>
                    {orderDetails && orderDetails.cartItems && orderDetails.cartItems.map((item, index) => (
                        <div key={index} style={{border: '1px solid #FF6F61', padding: '10px', marginTop: '15px'}}>
                            <h3>Selected Item {index + 1}</h3>
                            <p><strong>Dough:</strong> {item.dough}</p>
                            <p><strong>Size:</strong> {item.size}</p>
                            <p><strong>Toppings:</strong> {item.toppings.join(', ')}</p>
                            <p><strong>Price:</strong> {calculateItemPrice(item)}</p>
                            <Button color="info" onClick={() => handleEdit(item, index)}>Edit</Button>
                        </div>
                    ))}
                    <h3 style={{marginTop: '30px', color: '#FF6F61'}}>Total Price: {totalPrice}</h3>
                </div>
            )}
            {/* Edit Modal */}
            <Modal isOpen={editModalOpen} toggle={toggleEditModal} size="xl">
                <ModalHeader toggle={toggleEditModal}>Edit Item</ModalHeader>
                <ModalBody>
                    <Form>
                        <Container>
                            <Row>
                                <Col md="6">
                                    <DoughType choose={handleDoughType} selected={dough}
                                               previousSelection={previousDough}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <PizzaSize choose={handleSize} selected={size} previousSelection={previousSize}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <ToppingsSelector url={urlToppings} choose={handleToppings} selected={toppings}
                                                      previousSelection={previousToppings}/>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSaveChanges}>Save Changes</Button>
                    <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default OrderDetailsForm;
