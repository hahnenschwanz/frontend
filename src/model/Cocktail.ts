import { Ingredient } from './Ingredient';

export type CocktailId = string;

export interface Cocktail {
  id: CocktailId;
  name: string;
  imageUrl?: string | null;
  alcoholic: boolean;
  tags: string[];
  ingredients: Ingredient[];
  hidden: boolean;
}
