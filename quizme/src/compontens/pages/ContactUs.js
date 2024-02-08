import React from "react"
import "../../styles/form.css"




function ContactUs() {

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

    return (
        <div class="form" id="contact-form">
            <div class="wrapper">
                <form >
                    <h1>Contact Us</h1>
                    <div class="input-box">
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email"
                            onChange={handleChange}
                            value={contactFormData.email}
                            required 
                        />
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="input-box">
                        <input 
                            type="text" 
                            name="title" 
                            placeholder="Title" 
                            onChange={handleChange}
                            value={contactFormData.title}
                            required 
                        />
                        <i class="fa-solid fa-envelope"></i>
                    </div>
                    <div class="textarea-box">
                        <textarea 
                            form="contact-form" 
                            name="message" 
                            placeholder="Message..." 
                            maxlength="3000" 
                            onChange={handleChange}
                            value={contactFormData.message}
                            required></textarea>
                    </div>
                    <button class="btn">Send Message</button>
                </form>
            </div>
        </div>
    )
}

export default ContactUs