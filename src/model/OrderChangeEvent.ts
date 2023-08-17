import { CocktailId } from "./Cocktail";

export default interface OrderChangeEvent {
  cocktail: CocktailId | null;
  progress: number | null;
}
