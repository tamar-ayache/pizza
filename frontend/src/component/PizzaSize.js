import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupText, Input } from 'reactstrap';
/**
 * PizzaSize component provides a dropdown for selecting a pizza size.
 * It fetches the available sizes from an API endpoint and allows the user to select one.
 *
 * @param {Object} props - The component props
 * @param {Function} props.choose - The callback function to call with the selected pizza size
 * @param {string} [props.previousSelection] - The previously selected pizza size, if any
 */
function PizzaSize({ choose , previousSelection}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');
    const [sizes, setSizes] = useState([]);

    useEffect(() => {
        setSelectedSize(previousSelection || ''); // Set the selected size to the previous selection if available
    }, [previousSelection]);

    useEffect(() => {
        fetch('/api/sizes') // קריאה לשרת לקבלת רשימת הגדלים
            .then(response => response.json())
            .then(data => setSizes(data))
            .catch(error => console.error('Error fetching sizes:', error));
    }, []);

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
