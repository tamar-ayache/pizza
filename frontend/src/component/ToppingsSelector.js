import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupText, Input, Button } from 'reactstrap';

function ToppingsSelector({ url, choose }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedTopping, setSelectedTopping] = useState('');
    const [toppingsList, setToppingsList] = useState([]);
    const [selectedToppings, setSelectedToppings] = useState([]);

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const handleSelectTopping = (topping) => {
        setSelectedTopping(topping);
        addSelectedTopping(topping);
    };

    const addSelectedTopping = (topping) => {
        if (!selectedToppings.includes(topping)) {
            const newSelectedToppings = [...selectedToppings, topping];
            setSelectedToppings(newSelectedToppings);
            choose(newSelectedToppings);
        }
    };

    const removeTopping = (id) => {
        const newSelectedToppings = selectedToppings.filter((topping, index) => index !== id);
        setSelectedToppings(newSelectedToppings);
        choose(newSelectedToppings);
    };

    const getTopping = async () => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setToppingsList(data);
        } catch (error) {
            console.error("Error fetching toppings:", error);
        }
    };

    useEffect(() => {
        getTopping();
    }, []);

    return (
        <>
            <InputGroup className="mb-3">
                <InputGroupText>Topping</InputGroupText>
                <Input name="topping" value={selectedTopping} placeholder="Select topping" readOnly />
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                    <DropdownToggle caret>
                        Select
                    </DropdownToggle>
                    <DropdownMenu>
                        {toppingsList.map((topping, index) => (
                            <DropdownItem key={index} onClick={() => handleSelectTopping(topping)}>
                                {topping}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </InputGroup>
            <div>
                {selectedToppings.map((topping, index) => (
                    <div key={index}>
                        {topping} <Button close onClick={() => removeTopping(index)} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default ToppingsSelector;
