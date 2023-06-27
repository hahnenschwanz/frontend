import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CocktailCard.css';
import { Cocktail } from './model/Cocktail';

interface CocktailCardProps {
  cocktail: Cocktail;
  orderCocktail: (cocktailId: string) => void;
}

function CocktailCard({ cocktail, orderCocktail }: CocktailCardProps) {
  return (
    <div className="card" onClick={() => orderCocktail(cocktail.id)}>
      <img src={cocktail.imageUrl} alt="" />
      <div>
        <h2>{cocktail.name}</h2>
        <div>{cocktail.tags.join(', ')}</div>
      </div>
      <div className="go">
        <FontAwesomeIcon size="2x" icon={faPlay} />
      </div>
    </div>
  );
}

export default CocktailCard;
