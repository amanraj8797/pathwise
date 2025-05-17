import React, { useState } from "react";
import ChatButton from "./ChatButton";
import ChatInterface from "./ChatInterface";
import { AnimatePresence, motion } from "framer-motion";

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Pre-configured API key (in a real app, consider storing this more securely)
  const apiKey = "AIzaSyBMiQ4wb2F_67GNh3kZsk2V3Ng8j54RUFk"; // Replace with your actual Gemini API key

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <ChatInterface onClose={toggleChat} apiKey={apiKey} />
          </motion.div>
        )}
      </AnimatePresence>
      <ChatButton onClick={toggleChat} />
    </div>
  );
};

export default ChatWidget;
