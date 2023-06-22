import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FilterTag.css";

interface FilterTagProps {
  tag: string;
}

function FilterTag({ tag }: FilterTagProps) {
  const id = "filter-" + tag.toLowerCase().replace(" ", "-");

  return (
    <div className="toggle-button">
      <input type="checkbox" id={id} />
      <label htmlFor={id}>
        {tag}{" "}
        <span className="selected">
          <FontAwesomeIcon icon={faCheck} />
        </span>
      </label>
    </div>
  );
}

export default FilterTag;
