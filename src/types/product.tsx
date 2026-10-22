
export type MarketPrice = {
  market: string;
  division: string;
  min: number;
  max: number;
  averagePrice: number;
  
};

export type MarketProduct = {
  id: string;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  price: number;
  image: string;
  today: number;
  maxPrice: number;
  minPrice: number;
  averagePrice: number;
  description: string;
  emoji: string;

  name: string;
  icon?: string;

  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: MarketPrice[];
};


export type MarketCategory = {
  slug: string;
  name: string;
  nameBn?: string;
  icon?: string;
};