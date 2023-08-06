import "./App.css";
import Header from "./Header";
import OrderProgress from "./OrderProgress";
import { useEffect, useState } from "react";
import { User } from "./model/User";
import CupChangeEvent from "./model/CupChangeEvent";
import OrderState from "./model/OrderState";
import { Cocktail } from "./model/Cocktail";
import { getCocktails } from "./api/cocktail";
import { useMachineEvent } from "./api/events";
import OrderChangeEvent from "./model/OrderChangeEvent";
import { abort, order } from "./api/order";
import FilteredCocktailList from "./FilteredCocktailList";
import ErrorView from "./ErrorView";

const wrapError = (message: string, error: any) =>
  new Error(message, { cause: error });

function App() {
  const isMachine = true;

  const [cupId, setCupId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [orderState, setOrderState] = useState<OrderState | null>(null);
  const [cocktails, setCocktails] = useState<Record<string, Cocktail> | null>(
    null
  );
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadCocktails() {
      try {
        const cocktails: Cocktail[] = await getCocktails();
        if (cocktails.length === 0) {
          throw new Error("Liste der geladenen Cocktails ist leer");
        }
        const map: Record<string, Cocktail> = cocktails.reduce(
          (acc, cocktail) => ({ ...acc, [cocktail.id]: cocktail }),
          {}
        );
        setCocktails(map);
      } catch (error) {
        setError(wrapError("Cocktails konnten nicht geladen werden", error));
      }
    }
    loadCocktails();
  }, []);

  const machineEvent = useMachineEvent(setError);

  useEffect(() => {
    if (machineEvent === null) {
      return;
    }
    if (machineEvent.type === "CupChange") {
      const cupChange = machineEvent.body as CupChangeEvent;
      setUser(cupChange.user);
      setCupId(cupChange.cup);
    } else if (machineEvent.type === "OrderChange") {
      const orderChange = machineEvent.body as OrderChangeEvent;
      setOrderState(
        orderChange.order === null
          ? null
          : {
              cocktailId: orderChange.order.cocktailId,
              progress: orderChange.progress || 0,
            }
      );
    }
  }, [machineEvent]);

  const orderCocktail = async (cocktailId: string) => {
    try {
      setOrderState({
        cocktailId,
        progress: 0,
      });
      await order(cocktailId);
    } catch (error) {
      setError(wrapError("Cocktail konnte nicht bestellt werden", error));
    }
  };

  const abortOrder = async () => {
    try {
      await abort();
    } catch (error) {
      setError(wrapError("Bestellung konnte nicht abgebrochen werden", error));
    }
  };

  return (
    <>
      <Header
        cupId={cupId}
        user={user}
        isMachine={isMachine}
        style={
          error !== null
            ? "colors-error"
            : orderState !== null
            ? "colors-minimal"
            : ""
        }
      />
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
            cocktails={cocktails}
            orderCocktail={orderCocktail}
          />
        </main>
      )}
    </>
  );
}

export default App;
