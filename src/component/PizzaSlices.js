import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

const slices = [
    "Whole Pizza",
    "Left Half",
    "Right Half",
    "Slice 1",
    "Slice 2",
    "Slice 3",
    "Slice 4",
    "Slice 5",
    "Slice 6",
    "Slice 7",
    "Slice 8"
];

function PizzaSlices({ onSelectSlice }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedSlice, setSelectedSlice] = useState('');

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const handleSelectSlice = (slice) => {
        setSelectedSlice(slice);
        onSelectSlice(slice);
    };

    return (
        <div>
            <h3>Select Pizza Slice</h3>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret>
                    Select
                </DropdownToggle>
                <DropdownMenu>
                    {slices.map((slice, index) => (
                        <DropdownItem key={index} onClick={() => handleSelectSlice(slice)}>
                            {slice}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default PizzaSlices;
