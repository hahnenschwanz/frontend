import { CocktailId } from "../model/Cocktail";
import { Order } from "../model/Order";

let mockOrder: Order | null = null;
let mockFinishOrder = () => {
  mockOrder = null;
};

const order: (
  cocktailId: CocktailId,
  onError: (error: Error) => void
) => Promise<Order | null> = async (cocktailId, onError) => {
  if (process.env.REACT_APP_MOCK) {
    mockOrder = {
      id: "111111",
      cup: "4321",
      cocktailId,
      timestamp: new Date(),
    };
    return mockOrder;
  }

  try {
    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
  } catch (error) {
    onError(error as Error);
  }
};

const abort: (onError: (error: Error) => void) => Promise<void> = async (
  onError
) => {
  try {
    const response = await fetch("/api/abort", { method: "POST" });
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
  } catch (error) {
    onError(error as Error);
  }
};

export { order, abort, mockOrder, mockFinishOrder };
