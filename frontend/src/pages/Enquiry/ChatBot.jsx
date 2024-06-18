import React from 'react'
import { useState } from 'react';


function ChatBot() {
    const [showChat, setShowChat] = useState(false);

    const toggleChat = () => setShowChat(!showChat);
  return (
    <div>
          <div className='bot'>
      
        <button  onClick={toggleChat}>Bot</button>
      </div>

      {/* Chat Widget */}
      {showChat && (
        <div className="chat-widget">
          <iframe 
            title="dialogflow-chatbot"
            width="350" 
            height="430" 
            allow="microphone;"
            src="https://console.dialogflow.com/api-client/demo/embedded/6945063f-86de-40e8-9d85-84180a66215c"
          ></iframe>
          <img src={close} alt="close-button" onClick={toggleChat} width={50}/>
        </div>
      )}
    </div>
    
  )
}

export default ChatBot
