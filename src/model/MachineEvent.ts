import CupChangeEvent from "./CupChangeEvent";
import OrderChangeEvent from "./OrderChangeEvent";

export default interface MachineEvent {
  type: "CupChange" | "OrderChange";
  body: CupChangeEvent | OrderChangeEvent;
}
