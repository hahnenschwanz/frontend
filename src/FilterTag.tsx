import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FilterTag.css';
import TagFilterState from './model/TagFilterState';

interface FilterTagProps {
  tag: string;
  state: TagFilterState;
  setState: (state: TagFilterState) => void;
}

const invertedFilters: Record<string, string> = { Sahne: 'Ohne Sahne' };

function FilterTag({ tag, state, setState }: FilterTagProps) {
  const id = 'filter-' + tag.toLowerCase().replace(' ', '-');
  const selected = state !== TagFilterState.UNSPECIFIED;

  return (
    <div className="toggle-button">
      <input
        type="checkbox"
        id={id}
        checked={selected}
        onChange={() => {
          setState(
            state === TagFilterState.UNSPECIFIED
              ? invertedFilters[tag]
                ? TagFilterState.EXCLUDE
                : TagFilterState.REQUIRE
              : TagFilterState.UNSPECIFIED
          );
        }}
      />
      <label htmlFor={id}>
        {invertedFilters[tag] || tag}{' '}
        <span className="icon">
          {selected ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <FontAwesomeIcon icon={faCircle} />
          )}
        </span>
      </label>
    </div>
  );
}

export default FilterTag;
