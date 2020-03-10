import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Link, withRouter } from "react-router-dom";
import { Row, Col, Container, Image, Accordion, Card } from 'react-bootstrap';
import SidebarLogo from './de_bug-logo.png';
import UserIcon from './default-user.jpg';
import '../../styles/SideBarStyle.css';

const SideNavStyle = {
    // position: 'fixed',     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
    // height: '100%',
    height: '110vh',
    // width: '250px',     /* Set the width of the sidebar */
    zIndex: '1',      /* Stay on top of everything */
    // top: '3.4em',      /* Stay at the top */
    backgroundColor: '#212529', /* Black */
    overflowX: 'hidden',     /* Disable horizontal scroll */
    padding: '15px 30px 30px 30px',
    top: '0',
    position: 'sticky'
};

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePath: props.location.pathname,
            items: [
                {
                    path: '/admin/dashboard', /* path is used as id to check which NavItem is active basically */
                    name: 'Dashboard',
                    css: 'nav-icon fas fa-th',
                    expandable: false,
                    key: 1 /* Key is required, else console throws error. Does this please you Mr. Browser?! */
                },
                {
                    path: '/admin/projects',
                    name: 'Projects',
                    css: 'nav-icon fa fa-edit',
                    expandable: true,
                    open: false,
                    subItems: [
                        {
                            path: '/admin/projects/all',
                            name: 'View All',
                            css: 'far fa-circle nav-icon',
                            key: 1
                        },
                        {
                            path: '/admin/projects/create',
                            name: 'Create New',
                            css: 'fa fa-plus-circle nav-icon',
                            key: 2
                        }
                    ],
                    key: 2
                },
                {
                    path: '/admin/tickets',
                    name: 'Tickets',
                    css: 'nav-icon fas fa-ticket-alt',
                    expandable: true,
                    open: false,
                    subItems: [
                        {
                            path: '/admin/tickets/all',
                            name: 'View All',
                            css: 'far fa-circle nav-icon',
                            key: 1
                        },
                        {
                            path: '/admin/tickets/history',
                            name: 'History',
                            css: 'fas fa-history nav-icon',
                            key: 2
                        }
                    ],
                    key: 3
                },
            ],

            actions: [
                {
                    path: '/admin/projects/create',
                    name: 'Create Project',
                    css: 'nav-icon fa fa-edit',
                    expandable: false,
                    color: { backgroundColor: '#28a745' },
                    key: 1
                },
                {
                    path: '/admin/logout',
                    name: 'Log Out',
                    css: 'nav-icon fas fa-door-open',
                    expandable: false,
                    color: { backgroundColor: '#dc3545' },
                    key: 2
                },
            ]
        }
    }

    onItemClick = (path) => {
        this.setState({ activePath: path });
    }

    onOpen = (key) => {
        this.setState(prevState => ({
            items: prevState.items.map(obj => (key === obj.key ? Object.assign(obj, { open: !obj.open }) : obj)
            )
        }));

        console.log('onOpen', this.state.items);
    }

    render() {
        const { items, actions, activePath } = this.state;
        return (
            <Container className='side-bar-container' style={SideNavStyle} fluid='true'>
                <Row className='side-bar-logo'>
                    <Col xs={4}>
                        <a href='/admin/home/index'>
                            <Image src={SidebarLogo} />
                        </a>
                    </Col>
                </Row>

                <Row className='side-bar-user'>
                    <Image src={UserIcon} roundedCircle />
                    <a href='/admin/home/index'>Demo Admin</a>
                </Row>
                {
                    items.map((item) => {
                        return (
                            <NavItem
                                path={item.path}
                                name={item.name}
                                css={item.css}
                                expandable={item.expandable}
                                open={item.open}
                                subItems={item.subItems}
                                onItemClick={this.onItemClick}
                                onOpen={this.onOpen}
                                active={item.path === activePath}
                                key={item.key}
                                item={item}
                            />
                        );
                    })
                }
                <div className='sidebar-seperator'> </div>
                {
                    actions.map((action) => {
                        return (
                            <NavAction
                                path={action.path}
                                name={action.name}
                                css={action.css}
                                color={action.color}
                                onItemClick={this.onItemClick}
                                active={action.path === activePath}
                                key={action.key}
                            />
                        );
                    })
                }


            </Container>

        );
    }
}

const RouterSideNav = withRouter(SideNav);

const StyledNavItem = styled.div`
    height: 40px;
    /* width: 75px;  width must be same size as NavBar to center */
    /* text-align: center;  Aligns <a> inside of NavIcon div */
    margin-bottom: 0;   /* Puts space between NavItems */
    margin-left: 8px;
    margin-right: 8px;
    a {
        font-size: 16px;
        color: ${(props) => props.active ? "white" : "#9FFFCB"};
        :hover {
            opacity: 0.7;
            text-decoration: none; /* Gets rid of underlining of icons */
        }  
    }
    i {
        color: white;
    }
    border-radius: 5px;
    margin: 3px 0px;
    align-items: center;
    display: grid;
    padding: 8px 16px;
`;

class NavItem extends React.Component {
    handleClick = () => {
        const { path, onItemClick } = this.props;
        onItemClick(path);
    }

    render() {
        const { active } = this.props;
        return (
            <div>
                {
                    this.props.expandable ? (
                        <Accordion onClick={(param) => {
                            param = this.props.item.key;
                            this.props.onOpen(param)
                        }
                        }>
                            <Card>
                                <Card.Header className={this.props.open ? 'side-bar-card-header-open' : 'side-bar-card-header'}>
                                    <Accordion.Toggle as={Row} variant="link" eventKey="0">
                                        <Col xs={1} sm={1} md={1} lg={1}>
                                            <i className={this.props.css} />
                                        </Col>
                                        <Col xs={10} sm={10} md={10} lg={10}>
                                            <Link>
                                                {this.props.name}
                                            </Link>
                                        </Col>
                                    </Accordion.Toggle>
                                </Card.Header>
                                {
                                    this.props.subItems.map((subItem) => {
                                        return (
                                            <Accordion.Collapse eventKey="0" key={subItem.key}>
                                                <Card.Body className='side-bar-card-header' >
                                                    <Row>
                                                        <Col xs={1} sm={1} md={1} lg={1}>
                                                            <i className={subItem.css} />
                                                        </Col>
                                                        <Col xs={10} sm={10} md={10} lg={10}>
                                                            {/* <Link to={subItem.path} onClick={this.handleClick}>
                                                                {subItem.name}
                                                            </Link> */}
                                                            <a href={subItem.path} onClick={this.handleClick}>
                                                                {subItem.name}
                                                            </a>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        );
                                    })
                                }
                            </Card>
                        </Accordion>
                    ) : (
                            <StyledNavItem active={active}>
                                <Row>
                                    <Col xs={1} sm={1} md={1} lg={1}>
                                        <i className={this.props.css} />
                                    </Col>
                                    <Col xs={10} sm={10} md={10} lg={10}>
                                        {/* <Link to={this.props.path} onClick={this.handleClick}>
                                            {this.props.name}
                                        </Link> */}
                                        <a href={this.props.path} onClick={this.handleClick}>
                                            {this.props.name}
                                        </a>
                                    </Col>
                                </Row>
                            </StyledNavItem>
                        )
                }
            </div>
        )
    }
}


class NavAction extends React.Component {
    handleClick = () => {
        const { path, onItemClick } = this.props;
        onItemClick(path);
    }

    render() {
        return (
            <Container className='action-container' style={this.props.color} >
                <Row>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className={this.props.css} />
                    </Col>
                    <Col xs={10} sm={10} md={10} lg={10}>
                        {/* <Link to={this.props.path} onClick={this.handleClick}>
                            {this.props.name}
                        </Link> */}
                        <a href={this.props.path} onClick={this.handleClick}>
                            {this.props.name}
                        </a>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default class Sidebar extends React.Component {
    render() {
        return (
            <RouterSideNav />
        );
    }
}