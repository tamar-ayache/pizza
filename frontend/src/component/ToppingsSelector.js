import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

/**
 * ToppingsSelector component allows users to select pizza toppings.
 *
 * @param {Object} props - Component props
 * @param {string} props.url - The URL to fetch toppings options from
 * @param {Function} props.choose - Function to handle toppings selection
 * @param {Array} props.selected - The currently selected toppings
 * @param {Array} props.previousSelection - The previously selected toppings
 */
function ToppingsSelector({ url, choose, selected, previousSelection }) {
    const [toppingsOptions, setToppingsOptions] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setToppingsOptions(data))
            .catch(error => console.error('Error fetching toppings:', error));
    }, [url]);

    const handleChange = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        let newSelectedToppings;
        if (isChecked) {
            newSelectedToppings = [...selected, value];
        } else {
            newSelectedToppings = selected.filter(topping => topping !== value);
        }

        choose(newSelectedToppings);
    };

    return (
        <FormGroup>
            <Label for="toppings">Choose Toppings</Label>
            {toppingsOptions.length === 0 ? (
                <div>ללא תוספות</div>
            ) : (
                toppingsOptions.map((topping) => (
                    <FormGroup check key={topping}>
                        <Label check>
                            <Input
                                type="checkbox"
                                value={topping}
                                checked={selected.includes(topping)}
                                onChange={handleChange}
                            />
                            {topping}
                        </Label>
                    </FormGroup>
                ))
            )}
        </FormGroup>
    );
}

export default ToppingsSelector;
