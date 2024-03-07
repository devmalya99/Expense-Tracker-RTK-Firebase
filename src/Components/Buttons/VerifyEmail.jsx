// Import necessary dependencies
import { useState, useEffect } from 'react';
import { FirebaseAuthentication } from '../../Firebase/FirebaseConfig';
import axios from 'axios';

// Define your API Key and the endpoint URL
const API_KEY = 'AIzaSyA5AMoLCs0LylGNaa_jY7Vk_6PdBeULeMA';
const VERIFY_EMAIL_REQUEST =`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;

const VerifyEmail = () => {
    // Define and initialize the user and message states
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        if(user){
              console.log("user is", user);
              user.emailVerified ? setIsVerified(true) : setIsVerified(false);
        }
    }, [user]);

     // Function to handle email verification
     const handleVerify = async () => {
        // Get the current user's ID token
        const idToken = await FirebaseAuthentication.currentUser?.getIdToken(true);
    
        // Log the ID token and endpoint URL for checking
        console.log(`idToken: ${idToken}`);
        console.log(`VERIFY_EMAIL_REQUEST: ${VERIFY_EMAIL_REQUEST}`);
    
        // Executes if idToken exists 
        if(idToken){
            // Set the user state 
            setUser(FirebaseAuthentication.currentUser);

            // Use axios to send a POST request to the email verification endpoint
            axios.post(VERIFY_EMAIL_REQUEST, {
                'requestType': 'VERIFY_EMAIL',
                'idToken': idToken
            })
            .then((res) => {
                // On request success, set the message state and trigger an alert
                const newMessage = `A verification link has been sent to ${res.data.email}. Please check your email.`;
                setMessage(newMessage);
                alert(newMessage);
            })
            .catch((error) => {
                // Handle request failure, classify the cause based on the error message
                if (error.response && error.response.data.error.message === "INVALID_ID_TOKEN") {
                    setMessage("Your credential is no longer valid. Please sign in again.");
                } else if (error.response && error.response.data.error.message === "USER_NOT_FOUND") {
                    setMessage("There is no user record corresponding to this identifier. The user may have been deleted.");
                } else {
                    setMessage(error.message);
                }
            });
        }  
    } 

    // Component rendering
    return (
        <div>
            <button
                className="ml-4 mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded" 
                onClick={handleVerify}>
                    {isVerified? "Verified Profile": "Verify Email"}
                
            </button>
        </div>
    );
}

export default VerifyEmail;