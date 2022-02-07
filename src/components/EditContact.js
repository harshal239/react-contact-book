import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";

function EditContact(props) {
  const { id, name, email } = props.location.state.contact;
  const history = useHistory();
  const [contact, setContact] = useState({
    id,
    name,
    email,
  });
  const handleChange = (e) => {
    e.preventDefault();

    if (contact.name === "" || contact.email === "") {
      alert("All Fields are required");
    }
    props.UpdateContactHandler(contact);
    setContact({ ...contact, [e.target.value]: e.target.value });
    history.push("/");
  };

  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <Form onSubmit={handleChange}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            required
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            required
          />
        </div>
        <Button color="blue">Update</Button>
        <Link to="/">
          <Button color="red" content="Cancel" floated="right" />
        </Link>
      </Form>
    </div>
  );
}

export default EditContact;
