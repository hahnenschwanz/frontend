import { CocktailId } from './Cocktail';
import { CupId } from './User';

export type OrderId = string;

export interface Order {
  id: OrderId;
  cup: CupId;
  cocktailId: CocktailId;
  timestamp: Date;
}
