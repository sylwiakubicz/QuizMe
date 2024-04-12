import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { ThemeContext } from '../context/themeContext';
import { AuthContext } from '../context/authContext';
import axios from "axios"


import "../styles/modal.css"



function SendMailModal(props) {

    const {theme} = React.useContext(ThemeContext)
    const {setVerifyEmailCode} = React.useContext(AuthContext)
    const [email, setEmail] = React.useState("")
    const [error, setError] = React.useState("")

    const generateCode = () => {
        let code = (Math.random() + 1).toString(36).substring(7);
        return code
    }

    const handleSendCode = async () => {
        const code = generateCode()
        setVerifyEmailCode(code)
        console.log(code)
        
        try {
            console.log(email)
            await axios.post()
            console.log("sent")
        } catch (error) {
            setError(error.response.data)
        }

    }

    const handleChange = (e) => {
        setEmail(e.target.value)
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

