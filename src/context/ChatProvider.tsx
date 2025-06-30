
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Expert } from '@/lib/data';

interface ChatState {
  openChats: Expert[];
  activeChatId: number | null;
  minimizedChats: Set<number>;
  openChat: (expert: Expert) => void;
  closeChat: (expertId: number) => void;
  setActiveChat: (expertId: number) => void;
  toggleMinimize: (expertId: number) => void;
  tokens: number;
  addTokens: (amount: number) => void;
  deductTokens: (amount: number) => void;
}

const ChatContext = createContext<ChatState | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [openChats, setOpenChats] = useState<Expert[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [minimizedChats, setMinimizedChats] = useState<Set<number>>(new Set());
  const [tokens, setTokens] = useState<number>(25);

  const addTokens = (amount: number) => setTokens(prev => prev + amount);
  const deductTokens = (amount: number) => setTokens(prev => Math.max(0, prev - amount));

  const openChat = (expert: Expert) => {
    // Bring to front if already open, otherwise add it
    setOpenChats(prev => {
      const existing = prev.find(c => c.id === expert.id);
      if (existing) {
        return [existing, ...prev.filter(c => c.id !== expert.id)];
      }
      if (prev.length >= 3) {
        // Limit to 3 open chats, remove the last one
        return [expert, ...prev.slice(0, 2)];
      }
      return [expert, ...prev];
    });
    setActiveChatId(expert.id);
    // Un-minimize if it was minimized
    setMinimizedChats(prev => {
      const newSet = new Set(prev);
      newSet.delete(expert.id);
      return newSet;
    });
  };

  const closeChat = (expertId: number) => {
    setOpenChats(prev => prev.filter(c => c.id !== expertId));
    if (activeChatId === expertId) {
      setActiveChatId(openChats.length > 1 ? openChats[1].id : null);
    }
  };
  
  const setActiveChat = (expertId: number) => {
    setActiveChatId(expertId);
    // Also bring it to the front of the list
    setOpenChats(prev => {
        const chat = prev.find(c => c.id === expertId);
        if (!chat) return prev;
        return [chat, ...prev.filter(c => c.id !== expertId)];
    });
  };

  const toggleMinimize = (expertId: number) => {
    setMinimizedChats(prev => {
      const newSet = new Set(prev);
      if (newSet.has(expertId)) {
        newSet.delete(expertId);
        setActiveChatId(expertId);
      } else {
        newSet.add(expertId);
        if (activeChatId === expertId) {
            const nextActive = openChats.find(c => c.id !== expertId && !prev.has(c.id));
            setActiveChatId(nextActive ? nextActive.id : null);
        }
      }
      return newSet;
    });
  };

  return (
    <ChatContext.Provider value={{ 
      openChats, 
      activeChatId, 
      minimizedChats, 
      openChat, 
      closeChat, 
      setActiveChat, 
      toggleMinimize,
      tokens,
      addTokens,
      deductTokens
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
