import { useState } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FilterTag.css';

interface FilterTagProps {
  tag: string;
}

function FilterTag({ tag }: FilterTagProps) {
  const id = 'filter-' + tag.toLowerCase().replace(' ', '-');
  const [selected, setSelected] = useState(false);

  return (
    <div className="toggle-button">
      <input
        type="checkbox"
        id={id}
        checked={selected}
        onChange={() => setSelected((prev) => !prev)}
      />
      <label htmlFor={id}>
        {tag}{' '}
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
