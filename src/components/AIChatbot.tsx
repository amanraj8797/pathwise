// import React, { useState } from "react";
// import axios from "axios";
// import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   const API_KEY = "AIzaSyBMiQ4wb2F_67GNh3kZsk2V3Ng8j54RUFk"; // Store this securely in .env
//   const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const newMessages = [...messages, { text: input, sender: "user" }];
//     setMessages(newMessages);
//     setInput("");

//     try {
//       const response = await axios.post(API_URL, {
//         contents: [{ role: "user", parts: [{ text: input }] }],
//       });
//       const botReply =
//         response.data?.candidates[0]?.content?.parts[0]?.text ||
//         "Sorry, I didn't understand that.";
//       setMessages([...newMessages, { text: botReply, sender: "bot" }]);
//     } catch (error) {
//       console.error("Error fetching response:", error);
//       setMessages([
//         ...newMessages,
//         { text: "Error fetching response. Try again later.", sender: "bot" },
//       ]);
//     }
//   };

//   return (
//     <div className="fixed bottom-4 right-4 flex flex-col items-end">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="bg-blue-500 text-white p-3 rounded-full shadow-lg"
//       >
//         <IoChatbubbleEllipsesOutline size={24} />
//       </button>
//       {isOpen && (
//         <div className="chat-container bg-white p-4 border rounded-lg shadow-lg w-80 max-h-96 flex flex-col mt-2">
//           <div className="chat-box flex-grow overflow-y-auto p-2 border rounded-md">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`p-2 my-1 ${
//                   msg.sender === "user"
//                     ? "text-right text-blue-600"
//                     : "text-left text-gray-700"
//                 }`}
//               >
//                 <strong>{msg.sender === "user" ? "You:" : "AI:"}</strong>{" "}
//                 {msg.text}
//               </div>
//             ))}
//           </div>
//           <div className="flex mt-2">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               className="flex-grow p-2 border rounded-l-md"
//               placeholder="Ask something..."
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-blue-500 text-white p-2 rounded-r-md"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;
