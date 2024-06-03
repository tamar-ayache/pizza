import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupText, Input } from 'reactstrap';

const doughTypes = [
    "Classic Dough",
    "Whole Wheat Dough",
    "Gluten-Free Dough",
    "Sourdough",
    "Thin Crust Dough",
    "Thick Crust Dough",
    "Stuffed Crust Dough"
];

function DoughType({choose}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedDough, setSelectedDough] = useState('');

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const handleSelect = (dough) => {
        setSelectedDough(dough);
        choose(dough);
    };

    return (
        <InputGroup>
            <InputGroupText>Dough Type</InputGroupText>
            <Input name="dough" value={selectedDough} placeholder="Select dough type" readOnly />
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret>
                    Select
                </DropdownToggle>
                <DropdownMenu>
                    {doughTypes.map((dough, index) => (
                        <DropdownItem key={index} onClick={() => handleSelect(dough)}>
                            {dough}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </InputGroup>
    );
}

export default DoughType;
