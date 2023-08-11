import './Admin.css';
import { useEffect, useMemo, useState } from 'react';
import { Cocktail } from './model/Cocktail';
import { Ingredient } from './model/Ingredient';
import { updateCocktail } from './api/cocktail';
import { cleanStart, cleanStop, setScaleScaling, tareScale } from './api/admin';

interface AdminProps {
  pin: string;
  cocktails: Cocktail[];
  reloadCocktails: () => void;
  isMachine: boolean;
  setIsMachine: (isMachine: boolean) => void;
  setError: (error: Error) => void;
}

const wrapError = (message: string, error: any) =>
  new Error(message, { cause: error });

function Admin({
  pin,
  cocktails,
  reloadCocktails,
  isMachine,
  setIsMachine,
  setError,
}: AdminProps) {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    return () => {
      setUnlocked(false);
    };
  }, []);

  const checkPin = (input: string) => {
    if (input === pin) {
      setUnlocked(true);
    }
  };

  const ingredients = useMemo(() => {
    return cocktails
      .map((cocktail) => cocktail.ingredients)
      .flat()
      .filter(
        (ingredient, index, array) =>
          array.findIndex((i) => i.name === ingredient.name) === index
      )
      .map((ingredient) => ({
        ingredient,
        disabled: cocktails
          .filter((cocktail) =>
            cocktail.ingredients.some((i) => i.name === ingredient.name)
          )
          .every((cocktail) => cocktail.hidden),
      }));
  }, [cocktails]);

  const tryUpdateCocktail = async (cocktail: Cocktail) => {
    await updateCocktail(cocktail, (error) =>
      setError(wrapError('Cocktails konnten nicht aktualisiert werden', error))
    );
  };

  const toggleIngredient = async ({
    ingredient,
    disabled,
  }: {
    ingredient: Ingredient;
    disabled: boolean;
  }) => {
    if (disabled) {
      cocktails
        .filter((cocktail) =>
          cocktail.ingredients.some((i) => i.name === ingredient.name)
        )
        .map((cocktail) => ({
          ...cocktail,
          hidden: false,
        }))
        .forEach(tryUpdateCocktail);
    } else {
      cocktails
        .filter((cocktail) =>
          cocktail.ingredients.some((i) => i.name === ingredient.name)
        )
        .map((cocktail) => ({
          ...cocktail,
          hidden: true,
        }))
        .forEach(tryUpdateCocktail);
    }
    reloadCocktails();
  };

  return unlocked ? (
    <div className="admin-interface">
      <span>
        <button
          className={isMachine ? 'accent2' : 'colors-error'}
          onClick={() => setIsMachine(!isMachine)}
        >
          Ich bin das Maschinendisplay
        </button>
      </span>
      <span>
        <button
          className="accent2"
          onClick={() =>
            tareScale((error) =>
              setError(wrapError('Waage konnte nicht genullt werden', error))
            )
          }
        >
          Tare
        </button>
      </span>
      <div>
        <label>Scaling: </label>
        <input
          type="number"
          onBlur={(event) =>
            setScaleScaling(Number(event.target.value), (error) =>
              setError(wrapError('Scaling konnte nicht gesetzt werden', error))
            )
          }
        ></input>
      </div>
      <span>
        <label>Zutaten sperren</label>
        <ul className="admin-ingredients">
          {ingredients.map((ingredient) => (
            <li key={ingredient.ingredient.id}>
              <button
                className={ingredient.disabled ? 'colors-error' : 'accent2'}
                onClick={() => toggleIngredient(ingredient)}
              >
                {ingredient.ingredient.name}
              </button>
            </li>
          ))}
        </ul>
      </span>
      <button
        className="accent2"
        onClick={() =>
          cleanStart((error) =>
            setError(
              wrapError('Reinigung konnte nicht gestartet werden', error)
            )
          )
        }
      >
        Reinigung Start
      </button>
      <button
        className="accent2"
        onClick={() =>
          cleanStop((error) => {
            console.log({ error });
            setError(
              wrapError('Reinigung konnte nicht gestoppt werden', error)
            );
          })
        }
      >
        Reinigung Stop
      </button>
    </div>
  ) : (
    <div>
      <label>Pin: </label>
      <input
        type="password"
        pattern="[0-9]*"
        onChange={(event) => checkPin(event.target.value)}
      />
    </div>
  );
}

export default Admin;
