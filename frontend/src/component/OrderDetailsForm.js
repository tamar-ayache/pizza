import React, { useState } from 'react';
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
    const [editModalOpen, setEditModalOpen] = useState(false); // State to control modal visibility
    const [editedItem, setEditedItem] = useState(null); // State to store the item being edited
    const [editedItemIndex, setEditedItemIndex] = useState(null); // State to store the index of the item being edited
    const [dough, setDough] = useState('');
    const [size, setSize] = useState('');
    const [toppings, setToppings] = useState([]);
    const [urlToppings, setUrl] = useState('/api/toppings');

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
        setEditedItemIndex(index); // Set the index of the item being edited
        setEditedItem(item); // Set the item being edited
        setEditModalOpen(true); // Open the edit modal
    };

    const toggleEditModal = () => {
        setEditModalOpen(!editModalOpen); // Toggle the edit modal
    };

    const handleSaveChanges = () => {
        // Update the edited item in the cartItems array
        const updatedCartItems = orderDetails.cartItems.map((item, index) => {
            if (index === editedItemIndex) {
                return {
                    ...item,
                    dough: dough,
                    size: size,
                    toppings: toppings
                };
            }
            return item;
        });

        // Update the orderDetails state with the updated cartItems
        setOrderDetails({
            ...orderDetails,
            cartItems: updatedCartItems
        });

        toggleEditModal(); // Close the edit modal after saving changes
    };

    return (
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial, sans-serif', color: '#333' }}>
            <h1 style={{ marginBottom: '30px', color: '#FF6F61' }}>Order Details</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="orderIdInput" style={{ color: '#FF6F61' }}>Enter Order ID:</Label>
                    <Input
                        type="text"
                        name="orderId"
                        id="orderIdInput"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                        style={{ maxWidth: '300px', margin: 'auto', display: 'block' }}
                    />
                </FormGroup>
                <Button type="submit" color="danger" style={{ marginTop: '20px', backgroundColor: '#FF6F61', border: 'none' }}>Get Order Details</Button>
            </Form>
            {orderDetails && (
                <div style={{ marginTop: '40px', borderTop: '2px solid #FF6F61', paddingTop: '20px' }}>
                    <h2 style={{ color: '#FF6F61' }}>Customer Details</h2>
                    <p><strong>First Name:</strong> {orderDetails.firstName}</p>
                    <p><strong>Last Name:</strong> {orderDetails.lastName}</p>
                    <p><strong>Address:</strong> {orderDetails.address.city} {orderDetails.address.street} {orderDetails.address.houseNumber}</p>
                    <p><strong>Arrival Time:</strong> {orderDetails.arrivalTime}</p>
                    <h2 style={{ marginTop: '30px', color: '#FF6F61' }}>Selected Items</h2>
                    {orderDetails.cartItems.map((item, index) => (
                        <div key={index} style={{ border: '1px solid #FF6F61', padding: '10px', marginTop: '15px' }}>
                            <h3>Selected Item {index + 1}</h3>
                            <p><strong>Dough:</strong> {item.dough}</p>
                            <p><strong>Size:</strong> {item.size}</p>
                            <p><strong>Toppings:</strong> {item.toppings.join(', ')}</p>
                            <Button color="info" onClick={() => handleEdit(item, index)}>Edit</Button>
                        </div>
                    ))}
                </div>
            )}
            {/* Edit Modal */}
            <Modal isOpen={editModalOpen} toggle={toggleEditModal}>
                <ModalHeader toggle={toggleEditModal}>Edit Item</ModalHeader>
                <ModalBody>
                    {/* Edit form content goes here */}
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
                                    <ToppingsSelector url={urlToppings} choose={handleToppings} />
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <Button color="success" type="submit">Add to Cart</Button>
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
