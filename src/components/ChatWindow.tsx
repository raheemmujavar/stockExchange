import React, { useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageComponent } from './ChatMessage';
import { ChatMessage } from '../types';
import '../styles/ChatWindow.css';

interface Props {
  messages: ChatMessage[];
  onOptionSelect: (value: string) => void;
}

export function ChatWindow({ messages, onOptionSelect }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="messages-container">
        {messages.map((message) => (
          <ChatMessageComponent
            key={message.id}
            message={message}
            onOptionSelect={onOptionSelect}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}