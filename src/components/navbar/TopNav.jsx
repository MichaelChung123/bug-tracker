import React from 'react';
import { Nav, NavDropdown, Navbar, ListGroup } from 'react-bootstrap';
import '../../styles/NavBarStyle.css';

class TopNav extends React.Component {
    render() {
        return (
            <Navbar sticky='top' bg="light" expand="lg">
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav"> */}
                <Nav className="mr-auto">
                    <Nav.Link href="/demo/admin/home/index">Home</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <NavDropdown title="Actions" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Create Project</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Create Ticket</NavDropdown.Item>
                    </NavDropdown>
                </Nav>

                <NavDropdown
                    title={
                        <Navbar.Brand>
                            <i className='far fa-bell fa-2x' />
                        </Navbar.Brand>
                    }
                    id="basic-nav-dropdown"
                >

                    <ListGroup defaultActiveKey="#link1">
                        <ListGroup.Item disabled>
                            0 Notifications
                        </ListGroup.Item>
                        {/* <ListGroup.Item action href="#link2" disabled>
                            Link 2
                            </ListGroup.Item>
                        <ListGroup.Item action>
                            This one is a button
                            </ListGroup.Item> */}
                    </ListGroup>
                </NavDropdown>
                {/* </Navbar.Collapse> */}
            </Navbar >
        );
    }
}

export default TopNav;