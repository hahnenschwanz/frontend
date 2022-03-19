import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";

function Header({ nickname }) {
  return (
    <>
      <header className="accent2">
        <div className="left">
          <h1 className="title">Hahnenschwanz</h1>
        </div>
        <div className="center">
          <fieldset className="radio-group">
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
        <div className="right">
          {nickname ? (
            <span className="nickname">{nickname}</span>
          ) : (
            <div className="register">
              Becher registrieren <FontAwesomeIcon icon={faLink} />
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
