import React from "react";
import { Button, Modal, Transition } from "semantic-ui-react";

function DeleteContact({ open, setOpen, id, removeContactHandler }) {
  return (
    <Transition visible={open} animation="fade" duration={500}>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>Are you sure you want to delete ?</Modal.Header>
        <Modal.Actions>
          <Button
            icon="check"
            content="Yes"
            onClick={() => removeContactHandler(id)}
            labelPosition="right"
            className="btn-space"
            negative
          />
          <Button
            icon="remove"
            content="No"
            onClick={() => setOpen(false)}
            labelPosition="right"
            positive
          />
        </Modal.Actions>
      </Modal>
    </Transition>
  );
}

export default DeleteContact;
