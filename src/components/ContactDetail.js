import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import user from "../images/user.jpg";

function ContactDetail(props) {
  const { name, email } = props.location.state.contact;
  return (
    <div className="main">
      <Card centered>
        <Image src={user} />
        <Card.Content textAlign="center">
          <Card.Header>{name}</Card.Header>
          <Card.Description>{email}</Card.Description>
        </Card.Content>
      </Card>
      <div className="center-div">
        <Link to="/">
          <Button color="blue" className="center">
            Back to Contact List
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ContactDetail;
