import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupText, Input } from 'reactstrap';

function DoughType({ choose }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [doughTypes, setDoughTypes] = useState([]);
    const [selectedDough, setSelectedDough] = useState('');

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const handleSelect = (dough) => {
        setSelectedDough(dough);
        choose(dough);
    };

    useEffect(() => {
        const fetchDoughTypes = async () => {
            try {
                const response = await fetch('/api/doughs');
                const data = await response.json();
                setDoughTypes(data);
            } catch (error) {
                console.error('Error fetching dough types:', error);
            }
        };

        fetchDoughTypes();
    }, []);

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
