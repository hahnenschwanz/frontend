import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CocktailCard.css";

interface CocktailCardProps {
  name: string;
  imageUrl: string;
  imageClassNames: string;
  tags: string;
}

function CocktailCard({
  name,
  imageUrl,
  imageClassNames,
  tags,
}: CocktailCardProps) {
  return (
    <div className="card">
      <img src={imageUrl} className={imageClassNames} alt="" />
      <div>
        <h2>{name}</h2>
        <div>{tags}</div>
      </div>
      <div className="go">
        <FontAwesomeIcon size="2x" icon={faPlay} />
      </div>
    </div>
  );
}

export default CocktailCard;
