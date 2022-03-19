import "./App.css";
import Filter from "./Filter";
import Header from "./Header";
import CocktailList from "./CocktailList";

function App() {
  return (
    <>
      <Header nickname={null} />
      <main>
        <Filter allowSearch={false} />
        <CocktailList />
      </main>
    </>
  );
}

export default App;
