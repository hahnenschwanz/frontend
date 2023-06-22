import CupChangeEvent from "./CupChangeEvent";
import OrderChangeEvent from "./OrderChangeEvent";

export default interface Event {
  type: "CupChange" | "OrderChange";
  body: CupChangeEvent | OrderChangeEvent;
}
