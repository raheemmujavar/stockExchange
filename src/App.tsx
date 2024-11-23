import { useState, useCallback } from 'react';
import { ChatWindow } from './components/ChatWindow';
import { ChatMessage, Exchange } from './types';
import { Building2 } from 'lucide-react';
import './styles/App.css';
import stockData from '../files/stockData.json';

const exchanges: Exchange[] = stockData

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Welcome to the Stock Exchange Chatbot! Please select a stock exchange:',
      options: exchanges.map(exchange => ({
        label: exchange.stockExchange,
        value: `exchange_${exchange.code}`
      }))
    }
  ]);

  const addMessage = useCallback((message: Omit<ChatMessage, 'id'>) => {
    setMessages(prev => [...prev, { ...message, id: Date.now().toString() }]);
  }, []);

  const handleOptionSelect = useCallback((value: string) => {
    if (value.startsWith('exchange_')) {
      const exchangeId = value.replace('exchange_', '');
      const exchange = exchanges.find(e => e.code === exchangeId);
      
      if (exchange) {
        addMessage({
          type: 'user',
          content: `Show me stocks from ${exchange.stockExchange}`
        });
        
        addMessage({
          type: 'bot',
          content: `Here are the available stocks from ${exchange.stockExchange}:`,
          options: [
            ...exchange.topStocks.map(stock => ({
              label: `${stock.stockName} (${stock.code})`,
              value: `stock_${stock.code}`
            })),
            { label: '← Back to Exchanges', value: 'home' }
          ]
        });
      }
    } else if (value.startsWith('stock_')) {
      const stockSymbol = value.replace('stock_', '');
      const stock = exchanges.flatMap(e => e.topStocks).find(s => s.code === stockSymbol);
      
      if (stock) {
        addMessage({
          type: 'user',
          content: `Show me the price of ${stock.stockName}`
        });
        
        const exchange = exchanges.find(e => e.topStocks.some(s => s.code === stockSymbol));
        
        addMessage({
          type: 'bot',
          content: `${stock.stockName} (${stock.code}) is currently trading at $${stock.price.toFixed(2)}`,
          options: [
            ...(exchange ? [{
              label: `← Back to ${exchange.stockExchange} Stocks`,
              value: `exchange_${exchange.code}`
            }] : []),
            { label: '← Back to Exchanges', value: 'home' }
          ]
        });
      }
    } else if (value === 'home') {
      addMessage({
        type: 'user',
        content: 'Show me all exchanges'
      });
      
      addMessage({
        type: 'bot',
        content: 'Please select a stock exchange:',
        options: exchanges.map(exchange => ({
          label: exchange.stockExchange,
          value: `exchange_${exchange.code}`
        }))
      });
    }
  }, [addMessage]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <Building2 className="header-icon" />
          <h1 className="header-title">Stock Exchange Chatbot</h1>
        </div>
      </header>
      <ChatWindow messages={messages} onOptionSelect={handleOptionSelect} />
    </div>
  );
}

export default App;