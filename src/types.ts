export interface Stock {
  code: string;
  stockName: string;
  price: number;
}

export interface Exchange {
  code: string;
  stockExchange: string;
  topStocks: Stock[];
}

export type ChatMessage = {
  id: string;
  type: 'user' | 'bot';
  content: string;
  options?: {
    label: string;
    value: string;
  }[];
};