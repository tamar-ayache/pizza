import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupText, Input, Button } from 'reactstrap';

/**
 * ToppingsSelector component provides a dropdown for selecting pizza toppings.
 * It fetches the available toppings from an API endpoint and allows the user to select and remove toppings.
 * The total price is updated based on the number of selected toppings.
 *
 * @param {Object} props - The component props
 * @param {string} props.url - The API endpoint to fetch the toppings from
 * @param {Function} props.choose - The callback function to call with the selected toppings
 * @param {Array} [props.previousSelection] - The previously selected toppings, if any
 */
function ToppingsSelector({ url, choose , previousSelection}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedTopping, setSelectedTopping] = useState('');
    const [toppingsList, setToppingsList] = useState([]);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [totalPrice, setTotalPrice] = useState(40);
    const [previousTopping, setPreviousTopping] = useState(''); // הוספת סטייט לפרטים הקודמים של התוספות
    useEffect(() => {
        setSelectedToppings(previousSelection || ''); // Set the selected size to the previous selection if available
    }, [previousSelection]);
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
            updatePrice(newSelectedToppings.length);
        }
    };

    const removeTopping = (id) => {
        const newSelectedToppings = selectedToppings.filter((topping, index) => index !== id);
        setSelectedToppings(newSelectedToppings);
        choose(newSelectedToppings);
        updatePrice(newSelectedToppings.length);
    };

    const updatePrice = (toppingCount) => {
        console.log("totalPrice: " +totalPrice)
        console.log("toppingCount: " +toppingCount)
        setTotalPrice(40+toppingCount * 3);
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
            <div>
                <h5>Total Price: ₪{totalPrice}</h5>
            </div>
        </>
    );
}

export default ToppingsSelector;
