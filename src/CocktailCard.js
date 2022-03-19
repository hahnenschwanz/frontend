import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CocktailCard.css";

function CocktailCard({ name, image, imgClassNames, tags }) {
  return (
    <div className="card">
      <img src={image} className={imgClassNames} alt="" />
      <div>
        <h2>{ name }</h2>
        <div>{ tags }</div>
      </div>
      <div className="go">
        <FontAwesomeIcon size="2x" icon={faPlay} />
      </div>
    </div>
  );
}

export default CocktailCard;
