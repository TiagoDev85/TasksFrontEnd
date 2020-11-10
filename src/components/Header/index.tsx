import React from "react";
import {  Nav,  Navbar} from "react-bootstrap";
import { Link } from 'react-router-dom';
import '../../styles/pages/header.css';

const Header: React.FC = () => {
  return (
    <Navbar className="nav" bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>
        <Nav.Item as={Link} to="/" className="nav-brand">ACode.Tasks</Nav.Item>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item as={Link} to="/" className="nav-link">Início</Nav.Item>
          <Nav.Item as={Link} to="/tasks" className="nav-link">Tarefas</Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
