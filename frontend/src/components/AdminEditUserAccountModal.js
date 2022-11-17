import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";

import styles from "./AdminEditUserAccountModal.module.css";
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
            <Form.Group className="mb-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control placeholder={props.userID} disabled />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter New Username</Form.Label>
              <Form.Control
                ref={props.newUsernameRef}
                type="text"
                placeholder="Username"
              />
              <Form.Text muted>Max 20 characters</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter New Password</Form.Label>
              <Form.Control
                ref={props.newPasswordRef}
                type="password"
                placeholder="Password"
              />
              <Form.Text muted>Max 20 characters</Form.Text>
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

const AdminEditUserAccountModal = (props) => {
  return (
    <div>
      {ReactDOM.createPortal(
        <Overlay
          title={props.title}
          userID={props.userID}
          submitClicked={props.submitClicked}
          cancel={props.cancel}
          newUsernameRef={props.newUsernameRef}
          newPasswordRef={props.newPasswordRef}
        />,
        document.querySelector("#modal-root")
      )}
    </div>
  );
};

export default AdminEditUserAccountModal;
