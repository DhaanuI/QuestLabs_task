import "../response.css"
import React, { useEffect } from 'react';

export default function Response({ data }) {
    const paragraphs = data.split('\n')

    useEffect(() => {
        const speechHandler = () => {
            paragraphs.forEach((paragraph) => {
                const utterance = new SpeechSynthesisUtterance(paragraph);
                speechSynthesis.speak(utterance);
            });
        };

        // Start speech when component mounts
        speechHandler();

        // Clean up the speech when the component unmounts or updates
        return () => {
            speechSynthesis.cancel();
        };
    }, [paragraphs]);

    return (
        <div className="response">
            {paragraphs.map((paragraph, index) => (
                <h4 key={index}>{paragraph}</h4>
            ))}
        </div>
    );
}