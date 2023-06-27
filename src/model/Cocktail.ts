export type CocktailId = string;

export interface Cocktail {
  id: CocktailId;
  name: string;
  imageUrl: string;
  tags: string[];
  ingredients: string[];
}
