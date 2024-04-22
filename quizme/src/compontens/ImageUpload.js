import React, {useState, useRef} from "react";
import axios from "axios"
import DefaultImage from "../images/randomImg.jpg"
import LoadingImage from "../images/loading.gif"


const ImageUpload = () => {
    const [quizImage, setQuizImage] = useState(localStorage.getItem("imageURL") || DefaultImage)
    const fileUploadRef = useRef()

    const handleImageUpload = (e) => {
        e.preventDefault()
        fileUploadRef.current.click()
    }

    const uploadImageDisplay = async () => {
        setQuizImage(LoadingImage)
        const uploadedFile = fileUploadRef.current.files[0]

        const formData = new FormData()
        formData.append("file", uploadedFile)
        try {
            const response = await axios.post("https://api.escuelajs.co/api/v1/files/upload", formData)
            setQuizImage(response.data?.location)
            localStorage.setItem("imageURL", response.data?.location)
        } catch (error) {
            console.log(error)
            localStorage.removeItem("imageURL")
            setQuizImage(DefaultImage)
        }
        // const cachedURL = URL.createObjectURL(uploadedFile)
        // setQuizImage(cachedURL)
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