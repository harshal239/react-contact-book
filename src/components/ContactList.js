import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Button, List, Search } from "semantic-ui-react";
import ContactCard from "./ContactCard";

function ContactList({ contacts, removeContactHandler, term, searchKeyword }) {
  const renderContact = contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        key={contact.id}
        removeContactHandler={removeContactHandler}
      />
    );
  });

  const getSearchTerm = (e) => {
    searchKeyword(e.target.value);
  };
  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <Button color="blue" size="medium" floated="right">
            Add Contact
          </Button>
        </Link>
      </h2>
      <Search noResultsMessage="" value={term} onSearchChange={getSearchTerm} />
      <List celled>{renderContact}</List>
    </div>
  );
}

export default ContactList;
