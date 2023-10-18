import React from "react"
import "./style.css"


function ContactUs() {
    return (
        <div class="form" id="contact-form">
            <div class="wrapper">
                <form action="">
                    <h1>Contact Us</h1>
                    <div class="input-box">
                        <input type="text" name="email" placeholder="Email" required />
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="input-box">
                        <input type="text" name="title" placeholder="Title" required />
                        <i class="fa-solid fa-envelope"></i>
                    </div>
                    <div class="textarea-box">
                        <textarea form="contact-form" name="message" placeholder="Message..." maxlength="3000" required></textarea>
                    </div>
                    <button type="submit" class="btn">Send Message</button>
                </form>
            </div>
        </div>
    )
}

export default ContactUs