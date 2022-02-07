import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Image, Item } from "semantic-ui-react";
import user from "../images/download.png";
import DeleteContact from "./DeleteContact";

function ContactCard({ contact, removeContactHandler }) {
  const [open, setOpen] = useState(false);

  const { id, name, email } = contact;
  return (
    <>
      <DeleteContact
        open={open}
        setOpen={setOpen}
        id={id}
        removeContactHandler={removeContactHandler}
      />
      <Item className="center item">
        <Image src={user} alt="user" size="mini" avatar />
        <Item.Content verticalAlign="top">
          <Link to={{ pathname: `/contact/${id}`, state: { contact } }}>
            <Item.Header>{name}</Item.Header>
            <Item.Description>{email}</Item.Description>
          </Link>
        </Item.Content>
        <Icon
          name="trash alternate outline"
          color="red"
          size="big"
          className="icon"
          onClick={() => setOpen(true)}
        />
        <Link to={{ pathname: `/edit/${id}`, state: { contact } }}>
          <Icon name="edit" color="green" size="big" />
        </Link>
      </Item>
    </>
  );
}

export default ContactCard;
