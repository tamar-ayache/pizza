import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form, Input } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';

function UpdatePizza() {
    const { pizzaId } = useParams();
    const [dough, setDough] = useState('');
    const [size, setSize] = useState('');
    const [toppings, setToppings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/pizzas/${pizzaId}`)
            .then(response => response.json())
            .then(data => {
                setDough(data.dough);
                setSize(data.size);
                setToppings(data.toppings);
            })
            .catch(error => console.error('Error fetching pizza:', error));
    }, [pizzaId]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedPizza = { dough, size, toppings };

        fetch(`/api/pizzas/${pizzaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPizza)
        })
            .then(response => {
                if (response.ok) {
                    navigate('/home/cart');
                } else {
                    alert('Error updating pizza.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error updating pizza.');
            });
    };

    const handleDelete = () => {
        fetch(`/api/pizzas/${pizzaId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    navigate('/home/cart');
                } else {
                    alert('Error deleting pizza.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error deleting pizza.');
            });
    };

    return (
        <Form onSubmit={handleUpdate}>
            <Container>
                <Row>
                    <Col md="6">
                        <Input
                            type="text"
                            value={dough}
                            onChange={e => setDough(e.target.value)}
                            placeholder="Dough"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <Input
                            type="text"
                            value={size}
                            onChange={e => setSize(e.target.value)}
                            placeholder="Size"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <Input
                            type="text"
                            value={toppings.join(', ')}
                            onChange={e => setToppings(e.target.value.split(', '))}
                            placeholder="Toppings"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <Button color="success" type="submit">Update Pizza</Button>
                        <Button color="danger" onClick={handleDelete}>Delete Pizza</Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}

export default UpdatePizza;
