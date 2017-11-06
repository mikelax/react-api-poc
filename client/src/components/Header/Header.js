import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Grid, Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default class Header extends Component {

  login = () => {
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated, userHasScopes } = this.props.auth;

    // https://github.com/react-bootstrap/react-router-bootstrap
    // https://reacttraining.com/react-router/web/api/NavLink
    // https://auth0.com/docs/quickstart/spa/react
    return (
      <div>
         <Navbar inverse fixedTop>  
            <Navbar.Header>
              <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem href="/about">About</NavItem>
                {isAuthenticated() && (
                  <NavItem href="/profile">Profile</NavItem>
                )}
                {isAuthenticated() && userHasScopes(['write:messages']) && (
                  <NavItem href="/messages/create">Create Message</NavItem>
                )}
                {!isAuthenticated() && (
                  <NavItem href="/login">Login Page</NavItem>
                )}
              </Nav>
              <Nav pullRight>
                {
                  !isAuthenticated() && (
                    <NavItem><Button
                      bsStyle="primary"
                      className="btn-margin"
                      onClick={this.login}
                    >
                      Log In
                    </Button></NavItem>
                  )
                }
                {
                  isAuthenticated() && (
                    <NavItem><Button
                      bsStyle="primary"
                      className="btn-margin"
                      onClick={this.logout}
                    >
                      Log Out
                    </Button></NavItem>
                  )
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Jumbotron>
            <Grid>
              <h1>Forging Adventures Hero Image</h1>
              <p>
                <Button
                  bsStyle="success"
                  href="http://react-bootstrap.github.io/components.html"
                  target="_blank">
                  View React Bootstrap Docs
                </Button>
              </p>
            </Grid>
          </Jumbotron>
      </div>
    );
  }
}
