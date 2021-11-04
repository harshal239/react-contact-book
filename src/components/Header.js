import React from "react";
import { Container, Menu } from "semantic-ui-react";

function Header() {
  return (
    <Menu className="fixed">
      <Container className="center">
        <h2>React Contact Manager</h2>
      </Container>
    </Menu>
  );
}

export default Header;
