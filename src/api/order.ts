import { CocktailId } from '../model/Cocktail';
import { Order } from '../model/Order';

let mockOrder: Order | null = null;
let mockFinishOrder = () => {
  mockOrder = null;
};

const order: (cocktailId: CocktailId) => Promise<Order> = async (
  cocktailId
) => {
  mockOrder = {
    id: '111111',
    cup: '4321',
    cocktailId,
    timestamp: new Date(),
  };
  return mockOrder;
};

export { order, mockOrder, mockFinishOrder };
