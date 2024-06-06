import React from 'react';
import Logo from './Logo';
import Menu from './Menu';
import {Container, Row} from "reactstrap";

function HomePage() {
    return (
        <>
            <Container>
                <Row>
                    <Logo/>
                </Row>
                <Row>
                    <Menu/>

                </Row>

            </Container>
        </>
    );
}

export default HomePage;
