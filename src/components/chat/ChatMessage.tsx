import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { BotMessageSquare, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isUser,
  timestamp,
}) => {
  const [formattedMessage, setFormattedMessage] = useState<string>(message);

  useEffect(() => {
    let formatted = message;

    // Format bold text: replace *text* with <strong>text</strong>
    formatted = formatted.replace(/\*(.*?)\*/g, "<strong>$1</strong>");

    // Convert markdown-like tables (| col1 | col2 |) into HTML tables
    if (formatted.includes("|")) {
      const rows = formatted
        .trim()
        .split("\n")
        .filter((row) => row.includes("|"));

      if (rows.length > 1) {
        const tableRows = rows
          .map((row, index) => {
            const cells = row
              .split("|")
              .map((cell) => cell.trim())
              .filter((cell) => cell);
            if (index === 1 && cells.every((cell) => /^-+$/.test(cell))) {
              return ""; // Skip separator row
            }
            return `<tr>${cells
              .map((cell) => `<td>${cell}</td>`)
              .join("")}</tr>`;
          })
          .filter((row) => row !== "");

        formatted = `<table class="border-collapse border border-gray-400">${tableRows.join(
          ""
        )}</table>`;
      }
    }

    setFormattedMessage(formatted);
  }, [message]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex items-start max-w-[80%]",
          isUser ? "flex-row-reverse" : "flex-row"
        )}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full mr-2",
            isUser ? "bg-indigo-600 ml-2 mr-0" : "bg-gray-200"
          )}
        >
          {isUser ? (
            <MessageCircle className="h-4 w-4 text-white" />
          ) : (
            <BotMessageSquare className="h-4 w-4 text-gray-700" />
          )}
        </motion.div>
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "rounded-lg py-2 px-3",
            isUser
              ? "bg-indigo-600 text-white rounded-tr-none"
              : "bg-gray-200 text-gray-800 rounded-tl-none"
          )}
        >
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: formattedMessage }}
          />
          <p className="text-xs mt-1 opacity-70">
            {timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
