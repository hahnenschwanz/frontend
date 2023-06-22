import "./App.css";
import Filter from "./Filter";
import Header from "./Header";
import CocktailList from "./CocktailList";
import OrderProgress from "./OrderProgress";
import useWebSocket from "react-use-websocket";
import { useEffect, useState } from "react";
import User from "./model/User";
import MachineEvent from "./model/MachineEvent";
import CupChangeEvent from "./model/CupChangeEvent";
import OrderState from "./model/OrderState";

function App() {
  const isMachine = true;

  const [cupId, setCupId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [orderState, setOrderState] = useState<OrderState | null>(null);
  const { lastJsonMessage } = useWebSocket(
    `wss://${window.location.host}/events`
  );

  useEffect(() => {
    setTimeout(() => {
      setCupId("4321");
    }, 1000);

    setTimeout(() => {
      setOrderState({
        order: {
          id: "2222",
          cup: "4321",
          cocktail: "3333",
          timestamp: new Date(),
        },
        progress: 0,
      });

      setInterval(() => {
        setOrderState((state) => {
          if (!state) {
            return state;
          }
          if (state.progress < 100) {
            return {
              ...state,
              progress: Math.min(state.progress + Math.random() * 1, 100),
            };
          } else {
            return null;
          }
        });
      }, 2000);
    }, 3000);

    setTimeout(() => {
      setUser({
        id: "1111",
        name: "neri",
        cups: ["4321"],
      });
    }, 5000);

    if (lastJsonMessage == null) {
      return;
    }
    const event = lastJsonMessage as any as MachineEvent;
    if (event.type === "CupChange") {
      const body = event.body as CupChangeEvent;
      setCupId(body.cup);
      setUser(body.user);
    }
  }, [lastJsonMessage]);

  return (
    <>
      <Header cupId={cupId} user={user} isMachine={isMachine} />
      {orderState ? (
        <OrderProgress
          order={orderState.order}
          progress={orderState.progress}
        />
      ) : (
        <main>
          <Filter />
          <CocktailList />
        </main>
      )}
    </>
  );
}

export default App;
