import "./Header.css";

function Header() {
  return (
    <>
      <header>
        <div className="title">
          <h1>Hahnenschwanz</h1>
        </div>
        <div className="accent3">
          <fieldset className="radio-group cocktail-kind">
            <input
              id="cocktails-default"
              type="radio"
              name="cocktails"
              value="default"
              defaultChecked
            />
            <label htmlFor="cocktails-default">Standard-Cocktails</label>
            <input
              id="cocktails-user"
              type="radio"
              name="cocktails"
              value="user"
            />
            <label htmlFor="cocktails-user">Eigene Cocktails</label>
          </fieldset>
        </div>
        <div>
          <span class="username">Nick</span>
        </div>
      </header>
    </>
  );
}

export default Header;
