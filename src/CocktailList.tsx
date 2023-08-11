import CocktailCard from "./CocktailCard";
import "./CocktailList.css";
import { Cocktail } from "./model/Cocktail";

interface CocktailListProps {
  isMachine: boolean;
  cocktails: Cocktail[];
  orderCocktail: (cocktailId: string) => void;
}

function CocktailList({ isMachine, cocktails, orderCocktail }: CocktailListProps) {
  return (
    <div className="cocktail-list accent1">
      {cocktails.map((cocktail) => (
        <CocktailCard
					isMachine={isMachine}
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
