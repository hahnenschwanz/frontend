import CocktailCard from "./CocktailCard";
import "./CocktailList.css";
import { Cocktail } from "./model/Cocktail";

interface CocktailListProps {
  cocktails: Cocktail[];
  orderCocktail: (cocktailId: string) => void;
}

function CocktailList({ cocktails, orderCocktail }: CocktailListProps) {
  return (
    <div className="cocktail-list accent1">
      {cocktails.map((cocktail) => (
        <CocktailCard
          key={cocktail.id}
          cocktail={cocktail}
          orderCocktail={orderCocktail}
        />
      ))}
      {/* make the grid behave as i want */}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default CocktailList;
