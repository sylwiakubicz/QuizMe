import React from "react"
import DeleteAccount from "../DeleteAccount"


function MyProfile() {

    const [active, setActive] = React.useState("accountSettings")
    const [show, setShow] = React.useState(false)

    return (
        <div className="myaccount-container">
            <h1 className="text">My Account</h1>
            <div className="account-wrapper">
                <div className="options">
                    <li className={active === "accountSettings" ? "option active" : "option"} onClick={() => setActive("accountSettings")}>Account Settings</li>
                    <li className={active === "changePassword" ? "option active" : "option"} onClick={() => setActive("changePassword")}>Change Password</li>
                    <li className={active === "deleteAccount" ? "option active" : "option"} onClick={() => setActive("deleteAccount")}>Delete Account</li>
                </div>
                <div className={active === "accountSettings" ? "settings-container" : "notShow"}>
                    <h1 className="accountSetingsOption">ACCOUNT SETTINGS</h1>
                </div>
                <div className={active === "changePassword" ? "settings-container" : "notShow"}>
                    <h1 className="accountSetingsOption">CHANGE PASSWORD</h1>
                </div>
                <div className={active === "deleteAccount" ? "settings-container" : "notShow"}>
                    <h1 className="accountSetingsOption">DELETE ACCOUNT</h1>
                    <p className="accountSettingsInfo">All your statistics, quiz, questions and result will be deleted. You can not undo this action.</p>
                    {!show && <button className="quiz--btn delete-btn" onClick={() => setShow(true)}>DELETE</button>}
                    {show && <DeleteAccount setShow={setShow}/>}
                </div>
            </div>
        </div>
    )
}

export default MyProfile