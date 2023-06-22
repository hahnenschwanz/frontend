import CocktailCard from "./CocktailCard";
import "./CocktailList.css";

function CocktailList() {
  return (
    <div className="cocktail-list accent1">
      <CocktailCard
        name="Bloody Mary"
        tags="Süß, Sauer, Blutig, Vegan"
        imageUrl="./Bloody-Mary-icon.png"
        imageClassNames="reduce-lr"
      />
      <CocktailCard
        name="Long Island Iced Tea"
        tags="Sauer"
        imageUrl="./Long-Island-Iced-Tea-icon.png"
        imageClassNames="reduce-lr reduce-top"
      />
      <CocktailCard
        name="Bloody Mary"
        tags="Süß, Sauer, Blutig, Vegan"
        imageUrl="./Bloody-Mary-icon.png"
        imageClassNames="reduce-lr"
      />
      <CocktailCard
        name="Bloody Mary"
        tags="Süß, Sauer, Blutig, Vegan"
        imageUrl="./Bloody-Mary-icon.png"
        imageClassNames="reduce-lr"
      />
      <CocktailCard
        name="Bloody Mary"
        tags="Süß, Sauer, Blutig, Vegan"
        imageUrl="./Bloody-Mary-icon.png"
        imageClassNames="reduce-lr"
      />
      <CocktailCard
        name="Bloody Mary"
        tags="Süß, Sauer, Blutig, Vegan"
        imageUrl="./Bloody-Mary-icon.png"
        imageClassNames="reduce-lr"
      />
      <CocktailCard
        name="Screwdriver"
        tags="Fruchtig, Süß"
        imageUrl="./Cocktail-Screwdriver-Orange-icon.png"
        imageClassNames="reduce-lr"
      />
      <CocktailCard
        name="Screwdriver"
        tags="Fruchtig, Süß"
        imageUrl="./Cocktail-Screwdriver-Orange-icon.png"
        imageClassNames="reduce-lr"
      />
      <CocktailCard
        name="Screwdriver"
        tags="Fruchtig, Süß"
        imageUrl="./Cocktail-Screwdriver-Orange-icon.png"
        imageClassNames="reduce-lr"
      />
    </div>
  );
}

export default CocktailList;
