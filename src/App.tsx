import React, { useState } from 'react';
import { Button, Navbar, Nav, FormControl, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAddressBook, faSearch } from '@fortawesome/free-solid-svg-icons';

import firebase from 'firebase/app';
// eslint-disable-next-line import/no-unassigned-import
import 'firebase/firestore';
// eslint-disable-next-line import/no-unassigned-import
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import _Home from './compontent/Home'
import _Login from './compontent/Login'
import _Feed from './compontent/Feed'
import _Profile from './compontent/Profile'
import _Search from './compontent/Search'

firebase.initializeApp({
  apiKey: "AIzaSyCTj4u2BB-AFq8C3NQvAqhz_nh0BBEy4vk",
  authDomain: "summarize-1325c.firebaseapp.com",
  databaseURL: "https://summarize-1325c.firebaseio.com",
  projectId: "summarize-1325c",
  storageBucket: "summarize-1325c.appspot.com",
  messagingSenderId: "397524109196",
  appId: "1:397524109196:web:f2cff88f7d678a3605f8a9",
  measurementId: "G-ZH33BNVS7L"
})

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);
  const [query, setQuery] = useState("");

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add search query here
  }

  return (
    <Router>

      <Navbar bg="light" expand="lg" style={{ marginBottom: 100 }}>
        <Link to="/"><Navbar.Brand style={{ color: "#6c63ff" }}>Summarize</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Form inline>
              <input
                className="form form-control mr-sm-2"
                type="email"
                id="email"
                value={query}
                placeholder="1984 - George Orwell"
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button type="submit" variant="outline-success" className="mr-sm-2">Find Summary</Button>
            </Form> */}
          </Nav>
          <Link to="/search" className="theme1 mr-sm-3"><FontAwesomeIcon icon={ faSearch } size={"2x"}></FontAwesomeIcon></Link>
          { user ? 
          <Link to="/feed" className="theme1 mr-sm-3"><FontAwesomeIcon icon={ faAddressBook } size={"2x"}></FontAwesomeIcon></Link>
          :
          null
          }
          {/* <Link to="/feed" className="theme1 mr-sm-3"><FontAwesomeIcon icon={ faAddressBook } size={"2x"}></FontAwesomeIcon></Link> */}
          <Link to="/login" className="theme1 mr-sm-3"><FontAwesomeIcon icon={ faUser } size={"2x"}></FontAwesomeIcon></Link>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route path="/login">
          <_Login user={user} />
        </Route>
        <Route path="/feed">
          <_Feed user={user} />
        </Route>
        <Route path="/profile">
          <_Profile user={user} />
        </Route>
        <Route path="/search">
          <_Search user={user} />
        </Route>
        <Route path="/">
          <_Home user={user} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
