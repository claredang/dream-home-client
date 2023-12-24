import React, { useState } from "react";
import axios from "axios";
import "./chatbot.css";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatbotOpen, setChatbotOpen] = useState(true); // New state variable

  const toggleChatbot = () => {
    setChatbotOpen(!chatbotOpen);
  };

  const chatWithGPT3 = async (userInput) => {
    const apiEndpoint =
      "https://api.openai.com/v1/engines/davinci-codex/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer`,
    };

    const data = {
      prompt: userInput,
      max_tokens: 150,
    };
    try {
      const response = await axios.post(apiEndpoint, data, { headers });
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error("Error communicating with the API:", error.message);
      return "";
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { text: input, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const aiMessage = { text: "...", user: false };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);
    const response = await chatWithGPT3(input);
    const newAiMessage = { text: response, user: false };
    setMessages((prevMessages) => [...prevMessages.slice(0, -1), newAiMessage]);
    setInput("");
  };

  return (
    <div>
      <button className="chatbot-icon" onClick={toggleChatbot}>
        Chatbot
      </button>
      {chatbotOpen && (
        <div className="chatbot-container">
          <button className="close-button" onClick={toggleChatbot}>
            Close
          </button>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.user ? "user-message" : "ai-message"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <form className="chatbot-input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};
export default Chatbot;
