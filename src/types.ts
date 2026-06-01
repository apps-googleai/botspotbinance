export interface TradeSettings {
  symbol: string;
  interval: string; // '1m' | '5m' | '15m'
  orderSize: number; // in USD
  takeProfit: number; // in %
  stopLoss: number; // in %
  trailingStop: boolean;
  trailingStopPct: number; // in %
  rsiLength: number;
  rsiOversold: number; // buy threshold, default e.g. 30
  rsiOverbought: number; // sell threshold, default e.g. 70
  bbLength: number;
  bbStdDev: number; // default 2
  botRunning: boolean;
  tradingMode: 'SIMULATION' | 'LIVE';
  binanceApiKey: string;
  binanceApiSecret: string;
  activeStrategy?: 'BOLLINGER_RSI' | 'SUPER_SCALPER' | 'SUPER_BREAKOUT'; // New high-frequent strategy selector
  accuracySafeguard?: boolean; // Protect and salvage trades to ensure 99% accuracy
}

export interface TechnicalData {
  symbol: string;
  price: number;
  rsi: number;
  bbUpper: number;
  bbLower: number;
  bbMiddle: number;
  prices1m: number[]; // Last kline prices
  rsiHistory: number[];
  timestamp: string;
  stochRSIK?: number; // fast stochastic K
  stochRSID?: number; // fast stochastic D
  ema9?: number;      // short-term trend index
  ema21?: number;     // long-term trend index
}

export interface TradeOrder {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  entryPrice: number;
  exitPrice?: number;
  currentPrice: number;
  quantity: number;
  value: number; // initial value in USD
  pnl: number; // PnL in USD
  pnlPercent: number; // PnL in %
  status: 'ACTIVE' | 'CLOSED_PROFIT' | 'CLOSED_LOSS' | 'CLOSED_MANUAL' | 'SALVAGING';
  stopLossPrice: number;
  takeProfitPrice: number;
  highestPriceSinceBuy: number; // for trailing stop
  timestamp: number;
  exitTimestamp?: number;
  isLive: boolean; // True if Binance Real API order
  isAveraging?: boolean;
  notes?: string;
}

export interface TradingLog {
  id: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'BUY' | 'SELL';
  message: string;
  timestamp: string;
}

export interface BalancePoint {
  timestamp: string;
  balance: number;
}

export interface BotState {
  balance: number; // current balance
  initialBalance: number; // $100
  settings: TradeSettings;
  activeOrders: TradeOrder[];
  closedOrders: TradeOrder[];
  logs: TradingLog[];
  technicalData: Record<string, TechnicalData>;
  aiInsight: string;
  aiLoading: boolean;
  balanceHistory: BalancePoint[];
}
