import Order from "./model/Order";
import "./OrderProgress.css";

interface OrderProgressProps {
  order: Order;
  progress: number;
}

function OrderProgress({ order, progress }: OrderProgressProps) {
  return (
    <main className="orderstate">
      <div className="cocktail">
        <img src="./Bloody-Mary-icon.png" alt="" />
        <div className="cocktail-info">
          <h2>Bloody Mary</h2>
          <div className="tags">Süß, Sauer, Blutig, Vegan</div>
        </div>
      </div>
      <div className="state">
        <span>Cocktail wird gemischt</span>
        <div className="progress-container">
          <div
            className="progress-bar"
            id="progress"
            style={{
              inlineSize: `${progress}%`,
            }}
          ></div>
        </div>
      </div>
    </main>
  );
}

export default OrderProgress;
