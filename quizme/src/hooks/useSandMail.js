import axios from "axios"
import { useCallback } from "react"

export function useSendMail () {
    
    const sendMail = useCallback( async (path, dataToSend) => {    
        try {
         await axios.post(path, dataToSend, {
            withCredentials: true
        })
        return true
    } catch (err) {
        console.log(err)
        return false
    }}, [])

    return sendMail
}
