import React, { useState } from "react";

const ChatbotToggle = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-whites"
        />
      )}
      {open && (
        <div className="w-80 h-[500px] bg-white dark:bg-gray-900 border rounded-lg shadow-lg flex flex-col">
          <div className="flex justify-between items-center p-3 border-b">
            <h2 className="text-lg font-bold">Chatbot</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close Chatbot"
            >
              ✕
            </button>
          </div>
          {/* Chat UI content here */}
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Replace this with your chatbot component */}
            <p className="text-gray-500 text-center mt-20">
              Chatbot content goes here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotToggle;
