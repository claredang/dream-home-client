// import React, { useState } from "react";
// import axios from "axios";
// import "./chatbot.css";

// const Chatbot = () => {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [chatbotOpen, setChatbotOpen] = useState(true); // New state variable

//   const toggleChatbot = () => {
//     setChatbotOpen(!chatbotOpen);
//   };

//   const chatWithGPT3 = async (userInput) => {
//     const apiEndpoint =
//       "https://api.openai.com/v1/engines/davinci-codex/completions";
//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer`,
//     };

//     const data = {
//       prompt: userInput,
//       max_tokens: 150,
//     };
//     try {
//       const response = await axios.post(apiEndpoint, data, { headers });
//       return response.data.choices[0].text.trim();
//     } catch (error) {
//       console.error("Error communicating with the API:", error.message);
//       return "";
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;
//     const userMessage = { text: input, user: true };
//     setMessages((prevMessages) => [...prevMessages, userMessage]);
//     const aiMessage = { text: "...", user: false };
//     setMessages((prevMessages) => [...prevMessages, aiMessage]);
//     const response = await chatWithGPT3(input);
//     const newAiMessage = { text: response, user: false };
//     setMessages((prevMessages) => [...prevMessages.slice(0, -1), newAiMessage]);
//     setInput("");
//   };

//   return (
//     <div>
//       <button className="chatbot-icon" onClick={toggleChatbot}>
//         Chatbot
//       </button>
//       {chatbotOpen && (
//         <div className="chatbot-container">
//           <button className="close-button" onClick={toggleChatbot}>
//             Close
//           </button>
//           <div className="chatbot-messages">
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`message ${
//                   message.user ? "user-message" : "ai-message"
//                 }`}
//               >
//                 {message.text}
//               </div>
//             ))}
//           </div>
//           <form className="chatbot-input-form" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your message..."
//             />
//             <button type="submit">Send</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };
// export default Chatbot;

// ################
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./chatbot.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const API_KEY = process.env.OPENAI_API_KEY;

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendRequest = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);

    try {
      const response = await processMessageToChatGPT([...messages, newMessage]);
      const content = response.choices[0]?.message?.content;
      if (content) {
        const chatGPTResponse = {
          message: content,
          sender: "ChatGPT",
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    const systemMessage = `
        You will be provided with customer service queries with a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. Classify each query into a primary category and a secondary category. Provide your output in json format with the keys: primary and secondary 
        Primary categories: General housing or homestay inquiry, Design or interior style, Greeting
        
        General housing or homestay inquiry:
        - Homestay Inquiry
        - Homestay Recommendation 
        - Price
        
        Design or interior style:
        - Interior style definition
        - Style quiz
        - Suggestion or recommendation about design style
        
        Greeting:
        - Greeting from user 
        - User ask question related to what service website provides`;

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: systemMessage }, ...apiMessages],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    return response.json();
  }

  return (
    <div className="App">
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="ChatGPT is typing" />
                ) : null
              }
            >
              {messages.map((message, i) => {
                console.log(message);
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput
              placeholder="Send a Message"
              onSend={handleSendRequest}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};
export default Chatbot;
