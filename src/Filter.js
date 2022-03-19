import "./Filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faGlassWater,
  faMartiniGlass,
} from "@fortawesome/free-solid-svg-icons";

function Filter() {
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
        <div className="toggle-button">
          <input type="checkbox" id="filter-1" />
          <label htmlFor="filter-1">Fruchtig</label>
        </div>
        <div className="toggle-button">
          <input type="checkbox" id="filter-2" />
          <label htmlFor="filter-2">Süß</label>
        </div>
        <div className="toggle-button">
          <input type="checkbox" id="filter-3" />
          <label htmlFor="filter-3">Sauer</label>
        </div>
        <div className="toggle-button">
          <input type="checkbox" id="filter-4" />
          <label htmlFor="filter-4">Salzig</label>
        </div>
        <div className="toggle-button">
          <input type="checkbox" id="filter-5" />
          <label htmlFor="filter-5">Sahne</label>
        </div>
      </div>

      <span className="more-filters">
        <FontAwesomeIcon icon={faFilter} size="lg" color="var(--accent2)" />
      </span>
    </section>
  );
}

export default Filter;
