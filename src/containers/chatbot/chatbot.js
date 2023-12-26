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
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const API_KEY = "sk-";

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
      let final_content = await processUserMessage(content);

      console.log("message: ", message);
      if (final_content) {
        // const apiMessages = message.map((messageObject) => {
        //   const role =
        //     messageObject.sender === "ChatGPT" ? "assistant" : "user";
        //   return { role, content: messageObject.message };
        // });
        const apiRequestBody = {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: final_content },
            { role: "user", content: message },
          ],
          max_tokens: 200, // Set the desired value for max_tokens
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

  async function processUserMessage(chatMessages) {
    const stringToJson = JSON.parse(chatMessages);
    console.log(
      "test api: ",
      JSON.parse(chatMessages),
      stringToJson["primary"]
    );
    let unrelevantMessage =
      "Our website only provide answer related to design. Do you want to want some suggestion about style";
    if (chatMessages == "None") {
      return unrelevantMessage;
    }

    let secondaryCategory = "";

    switch (stringToJson["primary"]) {
      case "General housing/ Homestay inquiry":
        switch (stringToJson["secondary"]) {
          case "Homestay Inquiry":
            secondaryCategory = `
            You will be provided with customer service queries with a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
            Answer or ask customers further questions related to homestay location, style, price, ratings
            `;
            break;
          case "Homestay Recommendation":
            secondaryCategory = `
            You will be provided with customer service queries with a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
            Answer or recommend customers further questions related to homestay location, style, price, ratings
            `;
            break;
          default:
            secondaryCategory = `
            You will be provided with customer service queries with a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
            Answer or ask customers further questions related to homestay location, style, price, ratings
            `;
        }
        break;
      case "Design/Interior style":
        switch (stringToJson["secondary"]) {
          case "Interior style definition":
            secondaryCategory = `
              You will be provided with customer service queries with a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
              Answer the question of user that related to interior design style.
              `;
            break;
          case "Style quiz":
            secondaryCategory = `
              You will be provided with customer service queries with a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
              Suggest user do some style quiz or explain how style quiz work.
              `;
            break;
          case "Detect user interior style based on user image's input":
            secondaryCategory = `
                    You will be provided with customer service queries with a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
                    Suggest user give some image to detect the interior style with machine learning method.
                    `;
            break;
          case "Suggestion or recommendation about design style":
            secondaryCategory = `
                    You will be provided with customer service queries with a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
                    Answer or recommend customers further questions related to interior design style.
                    `;
            break;
          default:
            secondaryCategory = `
            You will be provided with customer service queries with a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
            Answer or recommend customers further questions related to interior design style.
              `;
        }
        break;
      case "Greeting":
        switch (stringToJson["secondary"]) {
          case "Greeting from user":
            secondaryCategory = `
                You will be provided with customer service queries with a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
                Provide some services the website provide to user.
                `;
            break;
          case "User ask question related to what service website provides":
            secondaryCategory = `
                You will be provided with customer service queries with a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
                Provide some services the website provide to user. `;
            break;
          default:
            secondaryCategory = `
                You will be provided with customer service queries with a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
                Provide some services the website provide to user. 
                `;
        }
    }

    console.log(
      "secondary category ",
      secondaryCategory,
      stringToJson["secondary"]
    );
    return secondaryCategory + ". Limit the answer in less than 200 words";
  }

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    const systemMessage = `
        You will be provided with customer service queries with a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. Classify each query into a primary category and a secondary category. Provide your output in json format with the keys: primary and secondary 
        
        1. Primary category: General housing/ Homestay inquiry
        Secondary category: 
        - Homestay Inquiry
        - Homestay Recommendation 
        - Price
        
        2. Primary category: Design/Interior style
        Secondary category: 
        - Interior style definition
        - Style quiz
        - Detect user interior style based on user image's input
        - Suggestion or recommendation about design style
        
        3. Primary category: Greeting
        Secondary category: 
        - Greeting from user 
        - User ask question related to what service website provides

        System instruction: Can only response either: 
        - "None" - if unrelevant to primary AND secondary categories above
        - OR in the json format with the keys: primary and secondary if user's message is relevant (both primary and secondary must match)
        `;

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
