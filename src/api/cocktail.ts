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
    name: "Long Island Iced Tea",
    imageUrl: "Long-Island-Iced-Tea-icon.png",
    alcoholic: true,
    tags: ["Sauer"],
    ingredients: [],
  },
  {
    id: "3",
    name: "Screwdriver",
    imageUrl: "",
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
  },
];

const getCocktails: () => Promise<Cocktail[]> = async () => {
  // await new Promise((resolve) => setTimeout(() => resolve(null), 7000));
  // const response = await fetch('/cocktail');
  // const data = await response.json();
  // return data;
  return mockCocktails;
};

export { getCocktails };
