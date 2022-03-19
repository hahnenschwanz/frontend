import "./App.css";
import Filter from "./Filter";
import Header from "./Header";
import CocktailList from "./CocktailList";

function App() {
  return (
    <>
      <Header />
      <main>
        <Filter />
        <CocktailList />
      </main>
    </>
  );
}

export default App;
