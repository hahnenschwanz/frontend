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
}

function Filter({ tags, setFilter }: FilterProps) {
  const [alcoholic, setAlcoholic] = useState<boolean>(true);
  const [tagStates, setTagStates] = useState<Record<string, TagFilterState>>(
    {}
  );

  useEffect(() => {
    setTagStates((states) => {
      return tags.reduce((acc, cur) => {
        return {
          ...acc,
          [cur]: states[cur] || TagFilterState.UNSPECIFIED,
        };
      }, {});
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
          onChange={() => setAlcoholic(true)}
        />
        <label htmlFor="alcohol-yes">
          <FontAwesomeIcon icon={faMartiniGlass} /> Mit
        </label>
        <input
          id="alcohol-no"
          type="radio"
          name="alcohol"
          checked={!alcoholic}
          onChange={() => setAlcoholic(false)}
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
