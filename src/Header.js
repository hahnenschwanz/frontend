import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import QRCode from "react-qr-code";
import Dialog from "./Dialog";
import "./Header.css";

function Header({ nickname }) {
  const [register, setRegister] = useState(false);

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
            <div className="register" onClick={() => setRegister(true)}>
              Becher registrieren <FontAwesomeIcon icon={faLink} />
            </div>
          )}
        </div>
      </header>
      <Dialog
        open={register}
        title="Becher registrieren"
        onDismiss={() => setRegister(false)}
      >
        <div className="split">
          <div>
            <div className="split-title">Scanne diesen QR-Code</div>
            <div className="qr">
              <QRCode
                size={192}
                value="Hello, world!"
                bgColor="var(--accent)"
              />
            </div>
          </div>
          <div>
            <div className="split-title">…oder öffne</div>
            <div className="split-content">
              <pre>https://hahnenschwanz.com/</pre>
              <p>
                klick dort auf <em>Becher registrieren</em> (oder auf deinen
                Namen um einen weiteren Becher hinzuzufügen), und gib diesen
                Code ein
              </p>
              <pre className="code">1234</pre>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Header;
