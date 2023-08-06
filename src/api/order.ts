import { CocktailId } from "../model/Cocktail";
import { Order } from "../model/Order";

let mockOrder: Order | null = null;
let mockFinishOrder = () => {
  mockOrder = null;
};

const order: (cocktailId: CocktailId) => Promise<Order | null> = async (
  cocktailId
) => {
  if (process.env.REACT_APP_MOCK) {
    mockOrder = {
      id: "111111",
      cup: "4321",
      cocktailId,
      timestamp: new Date(),
    };
    return mockOrder;
  }

  await new Promise((resolve) => setTimeout(() => resolve(null), 400));
  const response = await fetch("/order", {
    method: "POST",
    headers: {
      "Content-Type": "appliation/json",
    },
    body: JSON.stringify(cocktailId),
  });
  if (response.status === 409) {
    // an order is already in progress
    return null;
  }
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Server antwortete mit Statuscode ${response.status} ${response.statusText}:\n${body}`
    );
  }
  return await response.json();
};

const abort: () => Promise<void> = async () => {
  const response = await fetch("/abort", { method: "POST" });
  if (response.status === 409) {
    // no order is in progress
    return;
  }
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Server antwortete mit Statuscode ${response.status} ${response.statusText}:\n${body}`
    );
  }
};

export { order, abort, mockOrder, mockFinishOrder };
