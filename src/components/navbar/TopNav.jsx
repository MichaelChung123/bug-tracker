import React from 'react';
import { Nav, NavDropdown, Navbar, ListGroup } from 'react-bootstrap';
import '../../styles/NavBarStyle.css';

class TopNav extends React.Component {
    render() {
        return (
            <Navbar sticky='top' bg="light" expand="lg">
                <Nav className="mr-auto">
                    <Nav.Link href="/demo/admin/home/index">Home</Nav.Link>
                    <Nav.Link href="/admin/about">About</Nav.Link>
                    {/* <NavDropdown
                        title={
                            <Navbar.Brand>
                                <i className='far fa-bell fa-2x' />
                            </Navbar.Brand>
                        }
                        id="basic-nav-dropdown"
                    >

                        <ListGroup variant='flush' defaultActiveKey="#link1">
                            <ListGroup.Item disabled>
                                0 Notifications
                        </ListGroup.Item>
                        </ListGroup>
                    </NavDropdown> */}
                </Nav>

            </Navbar >
        );
    }
}

export default TopNav;