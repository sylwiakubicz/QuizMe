import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';

import "../styles/modal.css"



function DeleteConfirm(props) {
  return (
    <Modal
        show={props.showModal}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
        className='modal'
      >
        <Modal.Header closeButton>
          <Modal.Title className='modal-text'>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-text'>
        Your quiz "{props.quizTitle}" will be deleted permamently
        </Modal.Body>
        <Modal.Footer className='wrapper'>
          <Button onClick={props.handleClose} className='btn'>
            Close
          </Button>
          <Button onClick={props.handleDelete} className='btn'>Delete Quiz</Button>
        </Modal.Footer>
      </Modal>
  );
}

export default DeleteConfirm;

