import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { ThemeContext } from '../context/themeContext';
import { AuthContext } from '../context/authContext';


import "../styles/modal.css"
import { useNavigate } from 'react-router-dom';



function SendMailModal(props) {

    const navigate = useNavigate()
    const {theme} = React.useContext(ThemeContext)
    const {email, setEmail, error, setError, sendResetEmailCode} = React.useContext(AuthContext)


    const handleSendCode = async () => {
        const isSent = sendResetEmailCode()
        if (isSent) {
            navigate("/verifyemail")
        }
    }

    const handleChange = (e) => {
        setEmail(e.target.value)
        if (error !== "") {
            setError("")
        }
    }

  return (
    <Modal
        show={props.showModal}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
        data-theme={theme}
      >
        <Modal.Header closeButton>
          <Modal.Title>Forget password?</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        {props.message}
        <div className="input-box additional-padding">
            <input 
                type="email" 
                placeholder="Your email"
                name="email" 
                value={email}
                onChange={handleChange}
                required 
            />
        </div>
        {error && <p className="error">{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.handleClose} >
            Close
          </Button>
          <Button onClick={handleSendCode}>Send verification code</Button>
        </Modal.Footer>
      </Modal>
  );
}

export default SendMailModal;

