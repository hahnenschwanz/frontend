import { useCallback, useEffect, useMemo, useState } from 'react';
import CocktailList from './CocktailList';
import Filter from './Filter';
import './FilteredCocktailList.css';
import { Cocktail } from './model/Cocktail';

interface FilteredCocktailListProps {
  isMachine: boolean;
  cocktails: Record<string, Cocktail> | null;
  orderCocktail: (cocktailId: string) => void;
}

const tagRelevance = (tag: string, cocktails: Cocktail[]) => {
  const prevalence =
    cocktails.filter((cocktail) => cocktail.tags.includes(tag)).length /
    cocktails.length;
  return 1 - Math.abs(prevalence - 0.5) * 2;
};

function FilteredCocktailList({
  isMachine,
  cocktails,
  orderCocktail,
}: FilteredCocktailListProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [filter, setFilter] = useState<(cocktail: Cocktail) => boolean>(
    () => () => false
  );
  const [resetFilter, setResetFilter] = useState<
    (kind: 'tags' | 'all') => void
  >(() => () => {});

  const cocktailList = useMemo(
    () => Object.values(cocktails || {}),
    [cocktails]
  );

  useEffect(() => {
    const allTags = cocktailList
      .filter((cocktail) => !cocktail.hidden)
      .map((cocktail) => cocktail.tags)
      .flat()
      .filter((value, index, array) => index === array.indexOf(value));
    const sortedTags = allTags.sort(
      (a, b) =>
        tagRelevance(b, cocktailList) - tagRelevance(a, cocktailList) ||
        a.localeCompare(b)
    );
    setTags(sortedTags);
  }, [cocktailList]);

  const filterCallback = useCallback(
    (filter: (cocktail: Cocktail) => boolean) => setFilter(() => filter),
    []
  );

  const visibleCocktails = useMemo(
    () =>
      cocktailList
        .filter((cocktail) => !cocktail.hidden)
        .filter(filter)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [cocktailList, filter]
  );

  if (cocktails === null) {
    return (
      <div className="filtered-cocktails-info">Cocktails werden geladen</div>
    );
  }

  const orderCocktailResetFilters = (cocktailId: string) => {
    resetFilter('all');
    orderCocktail(cocktailId);
  };

  return (
    <>
      <Filter
        tags={tags}
        setFilter={filterCallback}
        setResetFilter={setResetFilter}
      />
      {visibleCocktails.length === 0 ? (
        <div className="filtered-cocktails-info">
          <div>Verrückter Mix, aber so einen Cocktail gibt es leider nicht</div>
          <button className="accent1" onClick={() => resetFilter('tags')}>
            Filter zurücksetzen
          </button>
        </div>
      ) : (
        <CocktailList
          isMachine={isMachine}
          cocktails={visibleCocktails}
          orderCocktail={orderCocktailResetFilters}
        />
      )}
    </>
  );
}

export default FilteredCocktailList;
