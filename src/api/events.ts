// import useWebSocket from 'react-use-websocket';
import MachineEvent from '../model/MachineEvent';
import { useEffect, useState } from 'react';
import { mockFinishOrder, mockOrder } from './order';

let mockInterval: NodeJS.Timer | null = null;
let mockProgress = 0;

const useEvents: () => MachineEvent | null = () => {
  // const { lastJsonMessage } = useWebSocket(
  //   `wss://${window.location.host}/events`
  // );
  // return lastJsonMessage as any as MachineEvent;

  const [mockMessage, setMockMessage] = useState<MachineEvent | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setMockMessage({
        type: 'CupChange',
        body: {
          cup: '4321',
          user: null,
        },
      });
    }, 1000);

    setTimeout(() => {
      setMockMessage({
        type: 'CupChange',
        body: {
          cup: '4321',
          user: {
            id: '1111',
            name: 'neri',
            cups: ['4321'],
          },
        },
      });
    }, 5000);

    setInterval(() => {
      if (mockOrder === null && mockInterval !== null) {
        clearInterval(mockInterval);
        mockInterval = null;

        setMockMessage({
          type: 'OrderChange',
          body: {
            order: mockOrder,
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
            type: 'OrderChange',
            body: {
              order: mockOrder,
              progress: mockProgress,
            },
          });
        }, 2000);

        setMockMessage({
          type: 'OrderChange',
          body: {
            order: mockOrder,
            progress: mockProgress,
          },
        });
      }
    }, 100);
  }, []);

  return mockMessage;
};

export { useEvents };
