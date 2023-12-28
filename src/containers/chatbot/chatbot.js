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

// const API_KEY = process.env.OPENAI_API_KEY;
const ChatButton = ({ onClick }) => {
  return (
    <button className="chat-button" onClick={onClick}>
      Open Chat
    </button>
  );
};

const CloseButton = ({ onClick }) => {
  return (
    <button
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 999, // Adjust the zIndex as needed
      }}
      onClick={onClick}
    >
      Close
    </button>
  );
};
const Chatbot = () => {
  const [isChatOpen, setChatOpen] = useState(false);

  const handleToggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
  };

  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm your chatbot assistant! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const systemMessage = `
    You will be provided with a list of categories and services which a website provide. The website service are providing homestay listing based on interior style as well as provide quiz test to detect user interior style taste. Classify each query into a primary_category category and a secondary_category category.

    System instruction: 
    Return {"relevant": "No"} for irrelevant questions.
    
    For relevant questions, return in the format {"primary_category": "text", "secondary_category": "text"}.
    
    Primary and Secondary Category Pairs:
    
    (Primary) General housing or homestay inquiry
    (Secondary) Homestay Inquiry
    (Secondary) Homestay Recommendation
    
    (Primary) Design or interior style
    (Secondary) Style quiz service
    (Secondary) Definition, suggestion, or recommendation about interior design style
    
    (Primary) Greeting
    (Secondary) User's greeting
    (Secondary) Website service
    `;

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
      let final_content = processUserMessage(content);

      console.log("message: ", message);
      console.log("message response: ", content, final_content);

      if (final_content === "Irrelevant") {
        const chatGPTResponse = {
          message:
            "Our website only provide answer related to design. Do you want to want some suggestion about style",
          sender: "ChatGPT",
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      } else {
        console.log("inside here", final_content);
        const apiRequestBody = {
          model: "gpt-3.5-turbo",
          messages: [
            // { role: "system", content: systemMessage },
            { role: "user", content: message },
            { role: "system", content: final_content },
          ],
          temperature: 0.42,
          max_tokens: 100,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        };

        let final_response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
          }
        );

        if (!final_response.ok) {
          console.error("OpenAI API error:", await final_response.text());
          // Handle the error appropriately
          return;
        }

        const jsonResponse = await final_response.json();
        final_response = jsonResponse.choices[0]?.message?.content;

        console.log("json", final_response);

        const chatGPTResponse = {
          message: final_response,
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

  function processUserMessage(chatMessages) {
    console.log("chat message: ", chatMessages);
    const stringToJson = JSON.parse(chatMessages);
    console.log(
      "test api: ",
      JSON.parse(chatMessages),
      stringToJson["primary_category"]
    );

    let secondaryCategory = "";

    let unrelevantMessage =
      "Our website only provide answer related to design. Do you want to want some suggestion about style";
    if (chatMessages == `{"relevant": "No"}`) {
      console.log("inside here relevant");
      secondaryCategory = "Irrelevant";
      return secondaryCategory;
    }

    switch (stringToJson["primary_category"]) {
      case "General housing/ Homestay inquiry":
        switch (stringToJson["secondary_category"]) {
          case "Homestay Inquiry":
            secondaryCategory = `
            You will be customer service assistant for a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
            Answer or ask customers further questions related to homestay location, style, price, ratings
            `;
            break;
          case "Homestay Recommendation":
            secondaryCategory = `
            You will be customer service assistant for a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
            Answer or ask customers further questions related to homestay location, style, price, ratings
            `;
            break;
          default:
            secondaryCategory = `
            You will be customer service assistant for a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
            Answer or ask customers further questions related to homestay location, style, price, ratings
            `;
        }
        break;
      case "Design/Interior style":
        switch (stringToJson["secondary_category"]) {
          case "Interior style definition":
            secondaryCategory = `
              You will be customer service assistant for a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
              Answer the question of user that related to interior design style knowledge.
              `;
            break;
          case "Style quiz service":
            secondaryCategory = `
              You will be customer service assistant for aa website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
              Suggest user do some style quiz or explain how style quiz work.
              `;
            break;
          case "Definition, suggestion, or recommendation about interior design style":
            secondaryCategory = `
            You will be customer service assistant for a a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
                    Suggest user give some image to detect the interior style with machine learning method.
                    `;
            break;
          case "Suggestion or recommendation about design style":
            secondaryCategory = `
            You will be customer service assistant for a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
                    Answer or recommend customers further questions related to interior design style.
                    `;
            break;
          default:
            secondaryCategory = `
            You will be customer service assistant for a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
            Answer or recommend customers further questions related to interior design style.
              `;
        }
        break;
      case "Greeting":
        switch (stringToJson["secondary_category"]) {
          case "User's greeting":
            secondaryCategory = `
            You will be customer service assistant for a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
                Provide some services the website provide to user.
                `;
            break;
          case "Website service":
            secondaryCategory = `
            You will be customer service assistant for a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
                Provide some services the website provide to user. `;
            break;
          default:
            secondaryCategory = `
            You will be customer service assistant for a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
                Provide some services the website provide to user. 
                `;
        }
    }

    console.log(
      "secondary_category category ",
      secondaryCategory,
      stringToJson["secondary_category"]
    );
    return secondaryCategory;
  }

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "ChatGPT" ? "system" : "user";
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo-1106",
      messages: [{ role: "system", content: systemMessage }, ...apiMessages],
      temperature: 0.3,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
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
    <div className={`App ${isChatOpen ? "chat-open" : ""}`}>
      {isChatOpen && (
        <div style={{ position: "relative", height: "500px", width: "500px" }}>
          <CloseButton onClick={handleCloseChat} />
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
                  // console.log(message);
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
      )}
      <ChatButton onClick={handleToggleChat} />
    </div>
  );
};
export default Chatbot;
