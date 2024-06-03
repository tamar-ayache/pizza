import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupText, Input, Button } from 'reactstrap';

const toppings = [
    "Olives",
    "Mushrooms",
    "Mozzarella",
    "Corn",
    "Pineapple",
    "Tomatoes",
    "Jalapeno"
];

function ToppingsSelector({ choose }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedTopping, setSelectedTopping] = useState('');
    const [toppingsList, setToppingsList] = useState([]);

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const handleSelectTopping = (topping) => {
        setSelectedTopping(topping);
        if (!toppingsList.includes(topping)) {
            const newToppingsList = [...toppingsList, topping];
            setToppingsList(newToppingsList);
            choose(newToppingsList);
        }
    };

    const removeTopping = (toppingToRemove) => {
        const newToppingsList = toppingsList.filter(topping => topping !== toppingToRemove);
        setToppingsList(newToppingsList);
        choose(newToppingsList);
    };

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
                        {toppings.map((topping, index) => (
                            <DropdownItem key={index} onClick={() => handleSelectTopping(topping)}>
                                {topping}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </InputGroup>
            <div>
                {toppingsList.map((topping, index) => (
                    <div key={index}>
                        {topping} <Button close onClick={() => removeTopping(topping)} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default ToppingsSelector;
