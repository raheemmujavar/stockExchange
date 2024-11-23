import React from 'react';
import { MessageCircle, Bot } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types';
import '../styles/ChatMessage.css';

interface Props {
  message: ChatMessageType;
  onOptionSelect: (value: string) => void;
}

export function ChatMessage({ message, onOptionSelect }: Props) {
  return (
    <div className={`message ${message.type}`}>
      <div className="avatar">
        {message.type === 'user' ? (
          <MessageCircle className="avatar-icon" />
        ) : (
          <Bot className="avatar-icon" />
        )}
      </div>
      <div className="message-content">
        <div className="message-bubble">
          {message.content}
        </div>
        {message.options && (
          <div className="options">
            {message.options.map((option) => (
              <button
                key={option.value}
                onClick={() => onOptionSelect(option.value)}
                className="option-button"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}