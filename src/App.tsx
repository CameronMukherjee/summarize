import React, { useState } from 'react';
import { Button, Navbar, Nav, FormControl, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// import _Navbar from './compontent/Navbar'
import _Home from './compontent/Home'
import _Login from './compontent/Login'

function App() {
  return (
    <Router>

      <Navbar bg="light" expand="lg" style={{ marginBottom: 100 }}>
            <Link to="/"><Navbar.Brand>Summarize</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/* <Link to="/top"><Button className="mr-sm-2">Top</Button></Link> */}
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success" className="mr-sm-2">Search</Button>
                </Form>
                <Link to="/login"><FontAwesomeIcon icon={ faUser } size={"2x"}></FontAwesomeIcon></Link>
            </Navbar.Collapse>
        </Navbar>

      <Switch>
        <Route path="/login">
          <_Login />re
        </Route>
        <Route path="/">
          <_Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
