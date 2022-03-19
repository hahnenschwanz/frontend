import CocktailCard from "./CocktailCard";
import "./CocktailList.css";

function CocktailList() {
  return (
    <div className="cocktail-list accent1">
      <CocktailCard
        name="Bloody Mary"
        tags="Süß, Sauer, Blutig, Vegan"
        image="./Bloody-Mary-icon.png"
        imgClassNames="reduce-lr"
      />
      <CocktailCard
        name="Long Island Iced Tea"
        tags="Sauer"
        image="./Long-Island-Iced-Tea-icon.png"
        imgClassNames="reduce-lr reduce-top"
      />
      <CocktailCard
        name="Bloody Mary"
        tags="Süß, Sauer, Blutig, Vegan"
        image="./Bloody-Mary-icon.png"
        imgClassNames="reduce-lr"
      />
      <CocktailCard
        name="Bloody Mary"
        tags="Süß, Sauer, Blutig, Vegan"
        image="./Bloody-Mary-icon.png"
        imgClassNames="reduce-lr"
      />
      <CocktailCard
        name="Bloody Mary"
        tags="Süß, Sauer, Blutig, Vegan"
        image="./Bloody-Mary-icon.png"
        imgClassNames="reduce-lr"
      />
      <CocktailCard
        name="Bloody Mary"
        tags="Süß, Sauer, Blutig, Vegan"
        image="./Bloody-Mary-icon.png"
        imgClassNames="reduce-lr"
      />
      <CocktailCard
        name="Screwdriver"
        tags="Fruchtig, Süß"
        image="./Cocktail-Screwdriver-Orange-icon.png"
        imgClassNames="reduce-lr"
      />
      <CocktailCard
        name="Screwdriver"
        tags="Fruchtig, Süß"
        image="./Cocktail-Screwdriver-Orange-icon.png"
        imgClassNames="reduce-lr"
      />
      <CocktailCard
        name="Screwdriver"
        tags="Fruchtig, Süß"
        image="./Cocktail-Screwdriver-Orange-icon.png"
        imgClassNames="reduce-lr"
      />
    </div>
  );
}

export default CocktailList;
