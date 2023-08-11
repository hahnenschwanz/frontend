import { Cocktail } from "../model/Cocktail";

const mockCocktails: Cocktail[] = [
  {
    id: "1",
    name: "Bloody Mary",
    imageUrl: "Bloody-Mary-icon.png",
    alcoholic: true,
    tags: ["Süß", "Sauer", "Blutig", "Vegan"],
    ingredients: [],
    hidden: false,
  },
  {
    id: "2",
    name: "Long Beach Ice Tea",
    imageUrl: "Long-Island-Iced-Tea-icon.png",
    alcoholic: true,
    tags: ["Sauer", "Jung"],
    ingredients: [
      { name: "Orangensaft" },
      { name: "Kirschsaft" },
      { name: "Tequila" },
      { name: "Wodka" },
      { name: "Gin" },
      { name: "Barcadi" },
      { name: "Zitronensaft" },
    ],
    hidden: true,
  },
  {
    id: "3",
    name: "Screwdriver",
    imageUrl: null,
    alcoholic: false,
    tags: ["Fruchtig", "Süß"],
    ingredients: [],
    hidden: false,
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
    hidden: false,
  },
  {
    id: "6",
    name: "Swimming Pool",
    imageUrl: "",
    alcoholic: true,
    tags: ["Bitter", "Fruchtig", "Sauer", "Sahne"],
    ingredients: [
      { name: "Ananassaft" },
      { name: "Sahne" },
      { name: "Batida de Coco" },
      { name: "Wodka" },
      { name: "Blue Cuaracao" },
      { name: "Barcadi" },
    ],
    hidden: false,
  },
];

const getCocktails: (
  onError: (error: Error) => void
) => Promise<Cocktail[]> = async (onError) => {
  if (process.env.REACT_APP_MOCK) {
    await new Promise((resolve) => setTimeout(() => resolve(null), 500));
    return mockCocktails;
  }
  try {
		const response = await fetch("/api/cocktail");
    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `Server antwortete mit Statuscode ${response.status} ${response.statusText}:\n${body}`
      );
    }
    return await response.json();
  } catch (error) {
    onError(error as Error);
  }
};

const updateCocktail: (
  cocktail: Cocktail,
  onError: (error: Error) => void
) => Promise<Cocktail> = async (cocktail, onError) => {
  if (process.env.REACT_APP_MOCK) {
    const index = mockCocktails.findIndex((c) => c.id === cocktail.id);
    mockCocktails[index] = cocktail;
    return cocktail;
  }
  try {
		const response = await fetch("/api/cocktail", {
			method: "POST",
			headers: {
				"Content-Type": "appliation/json",
			},
			body: JSON.stringify(cocktail),
		});
    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `Server antwortete mit Statuscode ${response.status} ${response.statusText}:\n${body}`
      );
    }
    return await response.json();
  } catch (error) {
    onError(error as Error);
  }
};

export { getCocktails, updateCocktail };
