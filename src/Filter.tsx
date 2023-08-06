import "./Filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faGlassWater,
  faMartiniGlass,
} from "@fortawesome/free-solid-svg-icons";
import FilterTag from "./FilterTag";
import { Cocktail } from "./model/Cocktail";
import { useEffect, useState } from "react";
import TagFilterState from "./model/TagFilterState";

interface FilterProps {
  tags: string[];
  setFilter: (filter: (cocktail: Cocktail) => boolean) => void;
  setResetFilter: (resetFilters: () => void) => void;
}

function toRecord<K extends string | number | symbol, V>(
  array: K[],
  valueMapper: (key: K) => V
) {
  return array.reduce((record, key) => {
    return Object.assign(record, { [key]: valueMapper(key) });
  }, {});
}

function Filter({ tags, setFilter, setResetFilter }: FilterProps) {
  const [alcoholic, setAlcoholic] = useState<boolean>(true);
  const [tagStates, setTagStates] = useState<Record<string, TagFilterState>>(
    {}
  );

  useEffect(() => {
    setResetFilter(() => {
      return () => {
				console.log('reset filter called');
        setTagStates(toRecord(tags, () => TagFilterState.UNSPECIFIED));
      };
    });
  }, [tags, setResetFilter]);

  useEffect(() => {
    setTagStates((states) => {
      return toRecord(tags, (tag) => states[tag] || TagFilterState.UNSPECIFIED);
    });
  }, [tags]);

  useEffect(() => {
    setFilter(
      (cocktail: Cocktail) =>
        cocktail.alcoholic === alcoholic &&
        Object.entries(tagStates).every(([tag, state]) => {
          switch (state) {
            case TagFilterState.REQUIRE:
              return cocktail.tags.includes(tag);
            case TagFilterState.EXCLUDE:
              return !cocktail.tags.includes(tag);
          }
          return true;
        })
    );
  }, [alcoholic, tagStates, setFilter]);

  return (
    <section className="filter accent2">
      <fieldset className="radio-group alcohol">
        <input
          type="radio"
          id="alcohol-yes"
          name="alcohol"
          checked={alcoholic}
					onChange={() => {}}
          onClick={() => setAlcoholic((alcoholic) => !alcoholic)}
        />
        <label htmlFor="alcohol-yes">
          <FontAwesomeIcon icon={faMartiniGlass} /> Mit
        </label>
        <input
          id="alcohol-no"
          type="radio"
          name="alcohol"
          checked={!alcoholic}
					onChange={() => {}}
          onClick={() => setAlcoholic((alcoholic) => !alcoholic)}
        />
        <label htmlFor="alcohol-no">
          <FontAwesomeIcon icon={faGlassWater} /> Ohne
        </label>
      </fieldset>
      <div className="tags">
        {tags.map((tag) => (
          <FilterTag
            key={tag}
            tag={tag}
            state={tagStates[tag]}
            setState={(state) => {
              setTagStates({
                ...tagStates,
                [tag]: state,
              });
            }}
          />
        ))}
      </div>
      <span className="more-filters">
        <FontAwesomeIcon icon={faFilter} size="2x" color="var(--accent2)" />
      </span>
    </section>
  );
}

export default Filter;
