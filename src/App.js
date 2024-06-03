// Importing necessary dependencies and components
import logo from './logo.svg';
import './App.css';

import {Container} from "reactstrap";
import React from "react";
import HomePage from "./component/HomePage";
import Support from "./component/Support"; // Imports React library


// Defining the App component
function App() {
    return (
        <Container>
            <Support/>
            {/*<HomePage/>*/}
        </Container>
    );
}

export default App;  // Exports the App component as default
