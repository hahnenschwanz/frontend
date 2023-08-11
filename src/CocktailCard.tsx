import { faInfoCircle, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import './CocktailCard.css';
import Dialog from './Dialog';
import { Cocktail } from './model/Cocktail';

interface CocktailCardProps {
  isMachine: boolean;
  cocktail: Cocktail;
  orderCocktail: (cocktailId: string) => void;
}

function CocktailCard({
  isMachine,
  cocktail,
  orderCocktail,
}: CocktailCardProps) {
  const [detail, setDetail] = useState(false);

  return (
    <>
      <div className="card" onClick={() => setDetail(true)}>
        {cocktail.imageUrl && <img src={cocktail.imageUrl} alt="" />}
        <div>
          <h2>{cocktail.name}</h2>
          <div>{cocktail.tags.join(', ')}</div>
        </div>
        <div className="go">
          <FontAwesomeIcon size="2x" icon={isMachine ? faPlay : faInfoCircle} />
        </div>
      </div>
      <Dialog
        open={detail}
        title={cocktail.name}
        onDismiss={() => setDetail(false)}
      >
        <div className="popup-cocktail">
          {cocktail?.imageUrl && <img src={cocktail.imageUrl} alt="" />}
          <div className="popup-cocktail-detail">
            <label>Tags</label>
            <div>{cocktail.tags.join(', ')}</div>
            <label>Zutaten</label>
            <ul className="popup-ingredients">
              {cocktail.ingredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.name}</li>
              ))}
            </ul>
          </div>
        </div>
        {isMachine ? (
          <div className="popup-cocktail-actions accent1">
            <button
              className="bordered"
              onClick={() => orderCocktail(cocktail.id)}
            >
              <FontAwesomeIcon size="lg" icon={faPlay} /> Start
            </button>
          </div>
        ) : null}
      </Dialog>
    </>
  );
}

export default CocktailCard;
