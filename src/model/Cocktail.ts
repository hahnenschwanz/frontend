export type CocktailId = string;

export interface Cocktail {
  id: CocktailId;
  name: string;
  imageUrl: string;
	alcoholic: boolean;
  tags: string[];
  ingredients: string[];
}
