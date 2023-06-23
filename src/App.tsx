import './App.css';
import Filter from './Filter';
import Header from './Header';
import CocktailList from './CocktailList';
import OrderProgress from './OrderProgress';
import useWebSocket from 'react-use-websocket';
import { useEffect, useState } from 'react';
import User from './model/User';
import MachineEvent from './model/MachineEvent';
import CupChangeEvent from './model/CupChangeEvent';
import OrderState from './model/OrderState';
import Cocktail from './model/Cocktail';

function App() {
  const isMachine = true;

  const [cupId, setCupId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [orderState, setOrderState] = useState<OrderState | null>(null);
  const [cocktails, setCocktails] = useState<Record<string, Cocktail>>({
    '1': {
      id: '1',
      name: 'Bloody Mary',
      imageUrl: './Bloody-Mary-icon.png',
      tags: ['Süß', 'Sauer', 'Blutig', 'Vegan'],
      ingredients: [],
    },
    '2': {
      id: '2',
      name: 'Long Island Iced Tea',
      imageUrl: './Long-Island-Iced-Tea-icon.png',
      tags: ['Sauer'],
      ingredients: [],
    },
    '3': {
      id: '3',
      name: 'Screwdriver',
      imageUrl: '',
      tags: ['Fruchtig', 'Süß'],
      ingredients: [],
    },
    '4': {
      id: '4',
      name: 'Whisky Sour',
      imageUrl: './Cocktail-Screwdriver-Orange-icon.png',
      tags: ['Knallig', 'Fruchtig', 'Jung'],
      ingredients: [],
    },
  });

  const { lastJsonMessage } = useWebSocket(
    `wss://${window.location.host}/events`
  );

  const orderCocktail = (cocktailId: string) => {
    setOrderState({
      order: {
        id: '2222',
        cup: '4321',
        cocktailId,
        timestamp: new Date(),
      },
      progress: 0,
    });

    const interval = setInterval(() => {
      setOrderState((state) => {
        if (!state) {
          return state;
        }
        if (state.progress < 100) {
          return {
            ...state,
            progress: Math.min(
              state.progress + Math.max(5, Math.random() * 20),
              100
            ),
          };
        } else {
          clearInterval(interval);
          return null;
        }
      });
    }, 2000);
  };

  useEffect(() => {
    setTimeout(() => {
      setCupId('4321');
    }, 1000);

    setTimeout(() => {
      setUser({
        id: '1111',
        name: 'neri',
        cups: ['4321'],
      });
    }, 5000);

    if (lastJsonMessage == null) {
      return;
    }
    const event = lastJsonMessage as any as MachineEvent;
    if (event.type === 'CupChange') {
      const body = event.body as CupChangeEvent;
      setCupId(body.cup);
      setUser(body.user);
    }
  }, [lastJsonMessage]);

  return (
    <>
      <Header cupId={cupId} user={user} isMachine={isMachine} minimal={orderState !== null} />
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
            orderCocktail={orderCocktail}
          />
        </main>
      )}
    </>
  );
}

export default App;
