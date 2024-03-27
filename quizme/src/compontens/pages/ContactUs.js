import React from "react"
import "../../styles/form.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {CreateQuizContext} from "../../context/CreateQuizContext"



function ContactUs() {
    const {deleteFromLocalStorage} = React.useContext(CreateQuizContext)

    deleteFromLocalStorage()

    const navigate = useNavigate()
    const [contactFormData, setContanctFormData] = React.useState(
        {
            email: "",
            title: "",
            message: ""
        }
    )
    
    function handleChange(event) {
        const {name, value} = event.target
        setContanctFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    const sendMail = async () => {
        try {
            await axios.post("/mail/send", contactFormData, {
                withCredentials: true
            })
            navigate("/success")
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="size" id="contact-form">
            <div className="wrapper form-wrapper form">
                <form >
                    <h1>Contact Us</h1>
                    <div className="input-box">
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email"
                            onChange={handleChange}
                            value={contactFormData.email}
                            required 
                        />
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div className="input-box">
                        <input 
                            type="text" 
                            name="title" 
                            placeholder="Title" 
                            onChange={handleChange}
                            value={contactFormData.title}
                            required 
                        />
                        <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div className="textarea-box">
                        <textarea 
                            form="contact-form" 
                            name="message" 
                            placeholder="Message..." 
                            maxLength="3000" 
                            onChange={handleChange}
                            value={contactFormData.message}
                            required></textarea>
                    </div>
        
                    <button className="btn" onClick={(e) => {
                        e.preventDefault()
                        sendMail()
                        }}>Send Message</button>
                </form>
            </div>
        </div>
    )
}

export default ContactUs