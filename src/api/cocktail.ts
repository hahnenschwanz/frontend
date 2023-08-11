import { ConstKeyword } from "typescript";
import { Cocktail } from "../model/Cocktail";

const mockCocktails = [
  {
    id: "1",
    name: "Bloody Mary",
    imageUrl: "Bloody-Mary-icon.png",
    alcoholic: true,
    tags: ["Süß", "Sauer", "Blutig", "Vegan"],
    ingredients: [],
  },
  {
    id: "2",
    name: "Long Beach Ice Tea",
    imageUrl: "Long-Island-Iced-Tea-icon.png",
    alcoholic: true,
    tags: ["Sauer", "Jung"],
    ingredients: ["Orangensaft", "Kirschsaft", "Tequila", "Wodka", "Gin", "Barcadi", "Zitronensaft"],
  },
  {
    id: "3",
    name: "Screwdriver",
    imageUrl: null,
    alcoholic: false,
    tags: ["Fruchtig", "Süß"],
    ingredients: [],
  },
  {
    id: "4",
    name: "Whisky Sour",
    imageUrl: "Cocktail-Screwdriver-Orange-icon.png",
    alcoholic: true,
    tags: ["Knallig", "Fruchtig", "Jung"],
    ingredients: [],
    hidden: true,
  },
  {
    id: "5",
    name: "Desire",
    imageUrl: "",
    alcoholic: true,
    tags: ["Bitter", "Fruchtig", "Sauer"],
    ingredients: [],
  },
  {
    id: "6",
    name: "Swimming Pool",
    imageUrl: "",
    alcoholic: true,
    tags: ["Bitter", "Fruchtig", "Sauer", "Sahne"],
    ingredients: ["Ananassaft", "Sahne", "Batida de Coco", "Wodka", "Blue Cuaracao", "Barcadi"],
  },
];

const getCocktails: () => Promise<Cocktail[]> = async () => {
  if (process.env.REACT_APP_MOCK) {
    await new Promise((resolve) => setTimeout(() => resolve(null), 1000));
    return mockCocktails;
  }
  const response = await fetch("/api/cocktail");
  return await response.json();
};

const updateCocktail: (cocktail: Cocktail) => Promise<Cocktail> = async (
  cocktail
) => {
  const response = await fetch("/api/cocktail", {
    method: "POST",
    headers: {
      "Content-Type": "appliation/json",
    },
    body: JSON.stringify(cocktail),
  });
  return await response.json();
};

export { getCocktails, updateCocktail };
