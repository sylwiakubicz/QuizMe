import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { ThemeContext } from '../context/themeContext';


import "../styles/modal.css"



function DeleteConfirm(props) {

    const {theme} = React.useContext(ThemeContext)

  return (
    <Modal
        show={props.showModal}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
        data-theme={theme}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        {props.message}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.handleClose} >
            Close
          </Button>
          <Button onClick={props.handleDelete}>{props.changeData ? "Save" : "Delete Quiz"}</Button>
        </Modal.Footer>
      </Modal>
  );
}

export default DeleteConfirm;

