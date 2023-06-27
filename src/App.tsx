import './App.css';
import Filter from './Filter';
import Header from './Header';
import CocktailList from './CocktailList';
import OrderProgress from './OrderProgress';
import { useEffect, useState } from 'react';
import { User } from './model/User';
import CupChangeEvent from './model/CupChangeEvent';
import OrderState from './model/OrderState';
import { Cocktail } from './model/Cocktail';
import { getCocktails } from './api/cocktail';
import { useEvents as useMachineEvent } from './api/events';
import OrderChangeEvent from './model/OrderChangeEvent';
import { order } from './api/order';

function App() {
  const isMachine = true;

  const [cupId, setCupId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [orderState, setOrderState] = useState<OrderState | null>(null);
  const [cocktails, setCocktails] = useState<Record<string, Cocktail>>({});

  useEffect(() => {
    async function loadCocktails() {
      const cocktails: Cocktail[] = await getCocktails();
      const map: Record<string, Cocktail> = cocktails.reduce(
        (acc, cocktail) => ({ ...acc, [cocktail.id]: cocktail }),
        {}
      );
      setCocktails(map);
    }
    loadCocktails();
  }, []);

  const machineEvent = useMachineEvent();

  useEffect(() => {
    if (machineEvent === null) {
      return;
    }
    if (machineEvent.type === 'CupChange') {
      const cupChange = machineEvent.body as CupChangeEvent;
      setUser(cupChange.user);
      setCupId(cupChange.cup);
    } else if (machineEvent.type === 'OrderChange') {
      const orderChange = machineEvent.body as OrderChangeEvent;
      setOrderState(
        orderChange.order === null
          ? null
          : {
              order: orderChange.order,
              progress: orderChange.progress || 0,
            }
      );
    }
  }, [machineEvent]);

  return (
    <>
      <Header
        cupId={cupId}
        user={user}
        isMachine={isMachine}
        minimal={orderState !== null}
      />
      {orderState ? (
        <OrderProgress
          cocktail={cocktails[orderState.order.cocktailId]}
          order={orderState.order}
          progress={orderState.progress}
        />
      ) : (
        <main>
          <Filter />
          <CocktailList
            cocktails={Object.values(cocktails)}
            orderCocktail={order}
          />
        </main>
      )}
    </>
  );
}

export default App;
