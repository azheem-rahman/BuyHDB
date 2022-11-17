import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";

import styles from "./AdminCreateAdminAccountModal.module.css";
import { Button, Form } from "react-bootstrap";

const Overlay = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={`${styles.board} ${styles.modal}`}>
        <header className={styles.header}>
          <h4>{props.title}</h4>
        </header>

        <div className={styles.content}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter New Admin Username</Form.Label>
              <Form.Control
                ref={props.newAdminUsernameRef}
                type="text"
                placeholder="Username"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter New Admin Password</Form.Label>
              <Form.Control
                ref={props.newAdminPasswordRef}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <div className="row">
              <div className="col d-flex justify-content-center">
                <Button variant="primary" onClick={props.submitClicked}>
                  Submit
                </Button>
                <div className="col"></div>
                <Button variant="secondary" onClick={props.cancel}>
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

const AdminCreateAdminAccountModal = (props) => {
  return (
    <div>
      {ReactDOM.createPortal(
        <Overlay
          title={props.title}
          submitClicked={props.submitClicked}
          cancel={props.cancel}
          newAdminUsernameRef={props.newAdminUsernameRef}
          newAdminPasswordRef={props.newAdminPasswordRef}
        />,
        document.querySelector("#modal-root")
      )}
    </div>
  );
};

export default AdminCreateAdminAccountModal;
