import "./Filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faGlassWater,
  faMartiniGlass,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import FilterTag from "./FilterTag";

function Filter({ allowSearch }) {
  return (
    <section className="filter accent2">
      <fieldset className="radio-group alcohol">
        <input
          type="radio"
          id="alcohol-yes"
          name="alcohol"
          value="yes"
          defaultChecked
        />
        <label htmlFor="alcohol-yes">
          <FontAwesomeIcon icon={faMartiniGlass} /> Mit
        </label>
        <input id="alcohol-no" type="radio" name="alcohol" value="no" />
        <label htmlFor="alcohol-no">
          <FontAwesomeIcon icon={faGlassWater} /> Ohne
        </label>
      </fieldset>
      <div className="tags">
        <FilterTag tag="Fruchtig" />
        <FilterTag tag="Süß" />
        <FilterTag tag="Sauer" />
        <FilterTag tag="Salzig" />
        <FilterTag tag="Sahne" />
      </div>
      <span className="more-filters">
        <FontAwesomeIcon icon={faFilter} size="2x" color="var(--accent2)" />
      </span>
      {allowSearch && (
        <span className="search">
          <FontAwesomeIcon icon={faSearch} size="2x" color="var(--accent2)" />
        </span>
      )}
    </section>
  );
}

export default Filter;
