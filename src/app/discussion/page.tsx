// src/models/Message.js



// src/pages/api/messages.js


// src/components/ChatUI.js


// src/pages/chat.js
import ChatUI from '@/components/ChatUI';
import React from 'react';

export default function ChatPage({searchParams}:any) {

  const unwrappedSearch=React.use(searchParams);

  const userId = unwrappedSearch.id;
  console.log(userId)
  // In a real app, you'd get the userId from your authentication system
 

  return (
   
     <div className="min-h-screen bg-gray-100">
      <ChatUI userId={userId} />
    </div>
   
  );
}