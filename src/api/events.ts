import useWebSocket from "react-use-websocket";
import MachineEvent from "../model/MachineEvent";
import { useEffect, useState } from "react";
import { mockFinishOrder, mockOrder } from "./order";

let mockInterval: NodeJS.Timer | null = null;
let mockProgress = 0;

const useMockMachineEvent: (
  onError: (error: Error) => void
) => MachineEvent | null = (setError: (error: Error) => void) => {
  const [mockMessage, setMockMessage] = useState<MachineEvent | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setMockMessage({
        type: "CupChange",
        body: {
          cup: "4321",
          user: null,
        },
      });
    }, 2000);

    // setTimeout(() => {
    //   setMockMessage({
    //     type: "CupChange",
    //     body: {
    //       cup: "4321",
    //       user: {
    //         id: "1111",
    //         cups: ["4321"],
    //       },
    //     },
    //   });
    // }, 5000);

    setInterval(() => {
      if (mockOrder === null && mockInterval !== null) {
        clearInterval(mockInterval);
        mockInterval = null;

        setMockMessage({
          type: "OrderChange",
          body: {
            cocktail: null,
            progress: mockProgress,
          },
        });
      }
      if (mockOrder !== null && mockInterval === null) {
        mockInterval = setInterval(() => {
          if (mockProgress < 100) {
            mockProgress = Math.min(100, mockProgress + 5 + Math.random() * 15);
          } else {
            mockProgress = 0;
            mockFinishOrder();
          }

          setMockMessage({
            type: "OrderChange",
            body: {
              cocktail: mockOrder?.cocktailId || null,
              progress: mockProgress,
            },
          });
        }, 20000);

        setMockMessage({
          type: "OrderChange",
          body: {
            cocktail: mockOrder?.cocktailId,
            progress: mockProgress,
          },
        });
      }
    }, 100);
  }, []);

  return mockMessage;
};

const useMachineEvent: (
  onError: (error: Error) => void,
  isMachine: boolean
) => MachineEvent | null = (setError, isMachine) => {
  const wsScheme = window.location.protocol === "https:" ? "wss://" : "ws://";
  const { lastJsonMessage } = useWebSocket(
    `${wsScheme}${window.location.host}/api/events`,
    {
      onOpen: () => {
        console.info("Websocket-Verbindung wurde geöffnet");
      },
      onClose: (event: CloseEvent) => {
        console.info("Websocket-Verbindung wurde geschlossen", event);
        const message = event.wasClean
          ? "Websocket-Verbindung wurde geschlossen"
          : "Websocket-Verbindung wurde unterbrochen";
        const closeError = new Error(
          `Fehlercode: ${event.code}, Grund: "${event.reason}"`
        );
        setError(new Error(message, { cause: closeError }));
      },
      onError: () => {
        console.error("Websocket-Verbindung fehlgeschlagen");
        setError(new Error("Problem mit der Websocket-Verbindung"));
      },
    },
    isMachine
  );
  return lastJsonMessage as any as MachineEvent | null;
};

export { useMachineEvent, useMockMachineEvent };
