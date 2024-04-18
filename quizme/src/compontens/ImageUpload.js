import React, {useState, useRef} from "react";
import DefaultImage from "../images/randomImg.jpg"

const ImageUpload = () => {
    const [quizImage, setQuizImage] = useState(DefaultImage)
    const fileUploadRef = useRef()

    const handleImageUpload = (e) => {
        e.preventDefault()
        fileUploadRef.current.click()
    }

    const uploadImageDisplay = () => {
        const uploadedFile = fileUploadRef.current.files[0]

        const cachedURL = URL.createObjectURL(uploadedFile)
        setQuizImage(cachedURL)
    }

    return (
        <div>
            <form encType="multipart/form-data">
                <h1>Add quiz image: </h1>
                <input ref={fileUploadRef} onChange={uploadImageDisplay} type="file" hidden></input> 
                
                <div className="setQuizImage">
                    <img src={quizImage} alt="quiz image" className="quizImg"></img>
                    <button className="quizCard-icons" type="submit" onClick={handleImageUpload}>
                        <i className="fa-solid fa-pen-to-square quizCard-icon"></i>
                    </button>
                </div>
            </form>            
        </div>
    )
}

export default ImageUpload