import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupText, Input } from 'reactstrap';

const sizes = [
    "small",
    "mid",
    "big",
];

function PizzaSize({ choose }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const handleSelect = (size) => {
        setSelectedSize(size);
        choose(size);
    };

    return (
        <InputGroup>
            <InputGroupText>Size</InputGroupText>
            <Input name="pizzaSize" value={selectedSize} placeholder="Select pizza size" readOnly />
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret>
                    Select
                </DropdownToggle>
                <DropdownMenu>
                    {sizes.map((size, index) => (
                        <DropdownItem key={index} onClick={() => handleSelect(size)}>
                            {size}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </InputGroup>
    );
}

export default PizzaSize;
