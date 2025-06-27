'use client';

import { useChat } from '@/context/ChatProvider';
import ChatWidget from './ChatWidget';

const ChatContainer = () => {
  const { openChats } = useChat();

  // We want to render them in reverse so they stack correctly with CSS
  const reversedChats = [...openChats].reverse();

  return (
    <div className="fixed bottom-0 right-4 z-50 flex items-end gap-3 pointer-events-none">
      {reversedChats.map((expert, index) => (
        <div key={expert.id} className="pointer-events-auto">
          <ChatWidget expert={expert} />
        </div>
      ))}
    </div>
  );
};

export default ChatContainer;
