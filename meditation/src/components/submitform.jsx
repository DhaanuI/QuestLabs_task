import '../submitform.css'
import React, { useState } from 'react';
import axios from 'axios';
import Loader from "./loader"
import Response from "./response"

const Form = ({ handleFormSubmit, handleResponse }) => {
    const [formData, setFormData] = useState({
        feeling: '',
        activity: '',
        issues: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = {
            usecase: 'GPT_MEDITATION_CREATOR',
            userInput: `feeling ${formData.feeling} right now,  currently are ${formData.activity} and facing ${formData.issues} issues today`,
        };

        try {
            handleFormSubmit(true);
            const response = await axios.post('https://good-pajamas-fox.cyclic.app/', requestBody);

            handleResponse(response.data.generatedText)
            setFormData({
                feeling: '',
                activity: '',
                issues: '',
            });
        } catch (error) {
            alert("Error in fetching Response, Try again")
            setFormData({
                feeling: '',
                activity: '',
                issues: ''
            });
        }
        finally {
            handleFormSubmit(false);
        }
    };

    return (
        <div style={{ marginTop: '-200px' }}>
            <h1 style={{ color: 'white' }}>Tell us about yourself</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="feeling"
                    placeholder='How are you feeling right now? '
                    value={formData.feeling}
                    onChange={handleChange} />

                <br />
                <input
                    type="text"
                    name="activity"
                    placeholder='What do you do?'
                    value={formData.activity}
                    onChange={handleChange} />
                <br />
                <input
                    type="text"
                    name="issues"
                    placeholder='What are the issues you are facing today?'
                    value={formData.issues}
                    onChange={handleChange} />
                <br />
                <input type="submit" />
            </form>
        </div>
    )
}

const Heading = () => {
    return (
        <div >
            <div style={{ marginBottom: "-20px" }}>
                <h2 style={{ color: "#e0e0e0" }}>Experience the profound benefits of yoga and meditation.
                    <br />
                    Join us on a journey of self-discovery and inner peace today.</h2>
            </div>

            <img src="https://e0.pxfuel.com/wallpapers/276/395/desktop-wallpaper-buddha-buddhism-meditation-harmony-spiritual-meditation.jpg" alt="" />
        </div>
    )
}


export default function SubmitForm() {
    const [showLoader, setShowLoader] = useState(false);
    const [res, setResponse] = useState('');
    return (
        <>
            <Heading />

            {!res && < Form
                handleFormSubmit={setShowLoader}
                handleResponse={setResponse}
            />}

            {showLoader && <Loader />}

            {res && <button onClick={() => setResponse("")} className='back'>Back</button>}

            <br /><br />

            {res && <Response data={res} />}
        </>
    )
}