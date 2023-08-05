export type IngredientId = string;

export interface Ingredient {
	id: IngredientId;
	name: string;
	amount: number;
	manual: boolean;
}
