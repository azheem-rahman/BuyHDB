import React from "react";
import ReactDOM from "react-dom";

import styles from "./RequestDeleteAccountModal.module.css";
import { Button } from "react-bootstrap";

const Overlay = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={`${styles.board} ${styles.modal}`}>
        <header className={styles.header}>
          <h4>{props.title}</h4>
        </header>

        <div className={styles.content}>
          <p>{props.message}</p>

          <div className="row">
            <div className="col d-flex justify-content-center">
              <Button variant="secondary" onClick={props.cancel}>
                Cancel
              </Button>
              <div className="col"></div>

              <Button variant="primary" onClick={props.confirmClicked}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ErrorModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          title={props.title}
          message={props.message}
          confirmClicked={props.confirmClicked}
          cancel={props.cancel}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default ErrorModal;
