import React, { useState } from 'react';
import './chatBot.css';
import { assets } from "../../assets/frontend_assets/assets";
 // Ensure you have an icon

function ChatBot() {
    const [showChat, setShowChat] = useState(false);

    const toggleChat = () => setShowChat(!showChat);

    return (
        <div className="chatbot-container">
            <div className='chatbot-button'>
               
                <img className='bot' onClick={toggleChat} src={assets.bot} width={80} />
            </div>

            {/* Chat Widget */}
            <div className={`chat-widget ${showChat ? 'open' : ''}`}>
                <iframe 
                    title="dialogflow-chatbot"
                    width="350" 
                    height="430" 
                    allow="microphone;"
                    src="https://console.dialogflow.com/api-client/demo/embedded/6945063f-86de-40e8-9d85-84180a66215c"
                ></iframe>
                
                
            </div>
        </div>
    )
}

export default ChatBot;
