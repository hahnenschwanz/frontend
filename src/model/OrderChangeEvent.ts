import { Order } from './Order';

export default interface OrderChangeEvent {
  order: Order | null;
  progress: number | null;
}
