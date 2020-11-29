import React from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";

const Header = () => {
  return (
    <div>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand href='#home'>Jaoued Mouetamid</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link href='#home'>Accueil</Nav.Link>
              <Nav.Link href='#link'>Articles</Nav.Link>
              <Nav.Link href='#link'>Portfolio</Nav.Link>
              <Nav.Link href='#link'>Contact</Nav.Link>
              {/* <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Contact</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
