import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import { Link, Outlet } from 'react-router-dom';
/**
 * SupportBar component renders a navigation bar with links to different pages.
 * It uses React Router for navigation and Reactstrap for styling.
 */
function SupportBar() {
    return (
        <>
            <ul>
                <li>
                    <Button color="primary">
                        <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About us</Link>
                    </Button>
                    <Button color="primary">
                        <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact us</Link>
                    </Button>
                    <Button color="success">
                        <Link to="/home" style={{ color: 'white', textDecoration: 'none' }}>Home page</Link>
                    </Button>
                </li>
            </ul>

            <Outlet />
        </>
    );
}

export default SupportBar;
