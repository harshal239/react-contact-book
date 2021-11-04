import React, { useEffect, useState } from "react";
import { uuid } from "uuidv4";
import { Container } from "semantic-ui-react";
import "./App.css";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContactDetail from "./components/ContactDetail";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const AddContactHandler = (contact) => {
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };
  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  useEffect(() => {
    const retrieveContacts = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    if (retrieveContacts) {
      setContacts(retrieveContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Container>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <ContactList
              contacts={contacts}
              removeContactHandler={removeContactHandler}
            />
          </Route>
          <Route path="/add">
            <AddContact AddContactHandler={AddContactHandler} />
          </Route>
          <Route
            path="/contact/:id"
            render={(props) => <ContactDetail {...props} />}
          />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
