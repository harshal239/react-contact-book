import React from "react";
import { Link } from "react-router-dom";
import { Button, List } from "semantic-ui-react";
import ContactCard from "./ContactCard";

function ContactList({ contacts, removeContactHandler }) {
  const renderContact = contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        key={contact.id}
        removeContactHandler={removeContactHandler}
      />
    );
  });
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
      <List celled>{renderContact}</List>
    </div>
  );
}

export default ContactList;
