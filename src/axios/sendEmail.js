import axios from "axios"

const sendEmail = async (emailData) => {
    return new Promise((resolve, reject) => {
        axios.post('https://api.resend.io/v1/emails', emailData, {
            headers: {
                'Authorization': process.env.REACT_APP_RESEND_KEY,
                'Content-Type': "application/json"
            }
        }).then((response) => {
            console.log('Email sent successfully:', response.data);
            resolve(response.data)
        }).catch((error) => {
            console.log("Error sending email:", error);
            reject(error)
        })
    })
}
export default sendEmail