import CocktailCard from './CocktailCard';
import './CocktailList.css';
import { Cocktail } from './model/Cocktail';

interface CocktailListProps {
  cocktails: Cocktail[];
  orderCocktail: (cocktailId: string) => void;
}

function CocktailList({ cocktails, orderCocktail }: CocktailListProps) {
  return (
    <div className="cocktail-list accent1">
      {cocktails.map((cocktail) => {
        return (
          <CocktailCard
            key={cocktail.id}
            cocktail={cocktail}
            orderCocktail={orderCocktail}
          />
        );
      })}
    </div>
  );
}

export default CocktailList;
