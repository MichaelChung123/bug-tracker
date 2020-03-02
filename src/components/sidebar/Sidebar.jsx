import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';

const StyledSideNav = styled.div`   
    position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
    height: 100%;
    width: 250px;     /* Set the width of the sidebar */
    z-index: 1;      /* Stay on top of everything */
    top: 3.4em;      /* Stay at the top */
    background-color: #222; /* Black */
    overflow-x: hidden;     /* Disable horizontal scroll */
    padding-top: 10px;
`;

const SideNavStyle = {
    // position: 'fixed',     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
    height: '100%',
    // width: '250px',     /* Set the width of the sidebar */
    zIndex: '1',      /* Stay on top of everything */
    // top: '3.4em',      /* Stay at the top */
    backgroundColor: '#222', /* Black */
    overflowX: 'hidden',     /* Disable horizontal scroll */
    paddingTop: '10px'
};

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePath: props.location.pathname,
            items: [
                {
                    path: '/dashboard', /* path is used as id to check which NavItem is active basically */
                    name: 'Dashboard',
                    css: 'nav-icon fas fa-th',
                    key: 1 /* Key is required, else console throws error. Does this please you Mr. Browser?! */
                },
                {
                    path: '/projects',
                    name: 'Projects',
                    css: 'nav-icon fa fa-edit',
                    key: 2
                },
                {
                    path: '/tickets',
                    name: 'Tickets',
                    css: 'nav-icon fas fa-ticket-alt',
                    key: 3
                },
            ]
        }
    }

    onItemClick = (path) => {
        this.setState({ activePath: path });
    }

    render() {
        const { items, activePath } = this.state;
        return (

            // <StyledSideNav>
            //     {
            //         items.map((item) => {
            //             return (
            //                 <NavItem
            //                     path={item.path}
            //                     name={item.name}
            //                     css={item.css}
            //                     onItemClick={this.onItemClick}
            //                     active={item.path === activePath}
            //                     key={item.key}
            //                 />
            //             );
            //         })
            //     }
            // </StyledSideNav>

            <Container style={SideNavStyle} fluid='true'>
                {
                    items.map((item) => {
                        return (

                            <NavItem
                                path={item.path}
                                name={item.name}
                                css={item.css}
                                onItemClick={this.onItemClick}
                                active={item.path === activePath}
                                key={item.key}
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
    height: 70px;
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
`;

class NavItem extends React.Component {
    handleClick = () => {
        const { path, onItemClick } = this.props;
        onItemClick(path);
    }

    render() {
        const { active } = this.props;
        return (
            <StyledNavItem active={active}>
                <Container>
                    <Row>
                        <Col sm={2} md={2} lg={2}>
                            <i className={this.props.css} />
                        </Col>
                        <Col sm={10} md={10} lg={10}>
                            <Link to={this.props.path} onClick={this.handleClick}>
                                {this.props.name}
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </StyledNavItem>


            // <StyledNavItem active={active}>
            //     <Link to={this.props.path} onClick={this.handleClick}>
            //         {this.props.name}
            //     </Link>
            //     {/* <Link to={this.props.path} className={this.props.css} onClick={this.handleClick}>
            //         <NavIcon></NavIcon>
            //     </Link> */}
            // </StyledNavItem>

        );
    }
}

const NavIcon = styled.div`
`;

export default class Sidebar extends React.Component {
    render() {
        return (
            <RouterSideNav></RouterSideNav>
        );
    }
}