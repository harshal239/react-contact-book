import React, { useEffect, useState } from "react";
import { uuid } from "uuidv4";
import { Container } from "semantic-ui-react";
import "./App.css";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContactDetail from "./components/ContactDetail";
import api from "./api/contact";
import EditContact from "./components/EditContact";

function App() {
  //const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const retrieveContacts = async () => {
    const response = await api.get("/");
    return response.data;
  };

  const AddContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/", request);
    setContacts([...contacts, response.data]);
  };
  const removeContactHandler = async (id) => {
    api.delete(`/${id}`);
    const newContactList = await contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };
  const UpdateContactHandler = async (contact) => {
    const response = await api.put(`/${contact.id}`, contact);
    console.log(response.data);
    const { id, name, email } = response.data;
    setContacts(
      (contacts.map = (contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);

    if (searchTerm !== " ") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    // const retrieveContacts = JSON.parse(
    //   localStorage.getItem(LOCAL_STORAGE_KEY)
    // );
    // if (retrieveContacts) {
    //   setContacts(retrieveContacts);
    // }

    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();

      if (allContacts) {
        setContacts(allContacts);
      }
    };
    getAllContacts();
  }, []);

  // useEffect(() => {
  //   //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  return (
    <Container>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <ContactList
              contacts={searchTerm.length < 1 ? contacts : searchResults}
              removeContactHandler={removeContactHandler}
              term={searchTerm}
              searchKeyword={searchHandler}
            />
          </Route>
          <Route path="/add">
            <AddContact AddContactHandler={AddContactHandler} />
          </Route>
          <Route
            path="/edit/:id"
            render={(props) => (
              <EditContact
                {...props}
                UpdateContactHandler={UpdateContactHandler}
              />
            )}
          />
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
