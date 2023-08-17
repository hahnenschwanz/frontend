import './App.css';
import Header from './Header';
import OrderProgress from './OrderProgress';
import { useEffect, useState } from 'react';
import { User } from './model/User';
import CupChangeEvent from './model/CupChangeEvent';
import OrderState from './model/OrderState';
import { Cocktail } from './model/Cocktail';
import { getCocktails } from './api/cocktail';
import OrderChangeEvent from './model/OrderChangeEvent';
import { abort, order } from './api/order';
import FilteredCocktailList from './FilteredCocktailList';
import ErrorView from './ErrorView';
import {
  useMachineEvent as machineEvent,
  useMockMachineEvent as mockMachineEvent,
} from './api/events';
import Dialog from './Dialog';
import Admin from './Admin';

const wrapError = (message: string, error: any) =>
  new Error(message, { cause: error });

const VERY_SECRET_PIN = '432357';

function App() {
  const [isMachine, setIsMachine] = useState(
    window.location.pathname === '/' + VERY_SECRET_PIN
  );

  const [cupId, setCupId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [orderState, setOrderState] = useState<OrderState | null>(null);
  const [cocktails, setCocktails] = useState<Record<string, Cocktail> | null>(
    null
  );
  const [error, setError] = useState<Error | null>(null);
  const [admin, setAdmin] = useState(false);

  const loadCocktails = async () => {
    const cocktails: Cocktail[] = await getCocktails((error) =>
      setError(wrapError('Cocktails konnten nicht geladen werden', error))
    );
    if (cocktails.length === 0) {
      setError(
        wrapError(
          'Cocktails konnten nicht geladen werden',
          new Error('Liste der geladenen Cocktails ist leer')
        )
      );
      return;
    }
    const map: Record<string, Cocktail> = cocktails.reduce(
      (acc, cocktail) => ({ ...acc, [cocktail.id]: cocktail }),
      {}
    );
    setCocktails(map);
  };

  useEffect(() => {
    loadCocktails();
    const interval = setInterval(() => loadCocktails(), 10000);
    return () => clearInterval(interval);
  }, []);

  const event = process.env.REACT_APP_MOCK
    ? mockMachineEvent(setError)
    : machineEvent(setError, isMachine);

  useEffect(() => {
    if (event === null) {
      return;
    }
    if (event.type === 'CupChange') {
      const cupChange = event.body as CupChangeEvent;
      setUser(cupChange.user);
      setCupId(cupChange.cup);
    } else if (event.type === 'OrderChange') {
      const orderChange = event.body as OrderChangeEvent;
      setOrderState(
        orderChange.cocktail === null
          ? null
          : {
              cocktailId: orderChange.cocktail,
              progress: orderChange.progress || 0,
            }
      );
    }
  }, [event]);

  const orderCocktail = async (cocktailId: string) => {
    setOrderState({
      cocktailId,
      progress: 0,
    });
    await order(cocktailId, (error) =>
      setError(wrapError('Cocktail konnte nicht bestellt werden', error))
    );
  };

  const abortOrder = async () => {
    await abort((error) =>
      setError(wrapError('Bestellung konnte nicht abgebrochen werden', error))
    );
  };

  return (
    <>
      <Header
        cupId={cupId}
        user={user}
        isMachine={isMachine}
        style={
          error !== null
            ? 'colors-error'
            : orderState !== null
            ? 'colors-minimal'
            : ''
        }
        openAdminDialog={() => setAdmin(true)}
      />
      <Dialog
        open={admin && !error}
        title="Administration"
        onDismiss={() => setAdmin(false)}
      >
        <Admin
          pin={VERY_SECRET_PIN}
          cocktails={Object.values(cocktails || {})}
          reloadCocktails={() => {
            loadCocktails();
          }}
          isMachine={isMachine}
          setIsMachine={setIsMachine}
          setError={setError}
        />
      </Dialog>
      {error !== null ? (
        <ErrorView error={error} />
      ) : orderState && cocktails ? (
        <OrderProgress
          cocktail={cocktails[orderState.cocktailId]}
          progress={orderState.progress}
          abortOrder={abortOrder}
        />
      ) : (
        <main>
          <FilteredCocktailList
            isMachine={isMachine}
            cocktails={cocktails}
            orderCocktail={orderCocktail}
          />
        </main>
      )}
    </>
  );
}

export default App;
