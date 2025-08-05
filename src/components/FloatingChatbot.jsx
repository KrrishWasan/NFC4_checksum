import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Directly use your key here
const genAI = new GoogleGenerativeAI("AIzaSyAW9f1x8yWdEDNUKeY4hLvH8jClx1qan5s");

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(input);
      const botMessage = { role: "bot", text: result.response.text() };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, something went wrong." },
      ]);
    }
  };

  return (
    <div>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-white shadow-lg rounded-xl border flex flex-col">
          <div className="flex justify-between items-center p-3 bg-blue-600 text-white rounded-t-xl">
            <span>Gemini Chatbot</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto max-h-96">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`my-2 p-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-100 text-right"
                    : "bg-gray-100 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex p-2 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-lg mr-2"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
