import { User } from './User';

export default interface CupChangeEvent {
  cup: string | null;
  user: User | null;
}
