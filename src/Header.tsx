import { faLink, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import Dialog from './Dialog';
import './Header.css';
import { User } from './model/User';

interface HeaderProps {
  cupId: string | null;
  user: User | null;
  isMachine: boolean;
  style?: string;
}

interface UserProps {
  cupId: string | null;
  user: User | null;
  isMachine: boolean;
  openRegisterDialog: () => {};
}

function UserInfo({ cupId, user, isMachine, openRegisterDialog }: UserProps) {
  if (isMachine) {
    if (cupId === null) {
      return null;
    }
    if (user === null) {
      return (
        <div className="register" onClick={() => openRegisterDialog()}>
          Becher registrieren <FontAwesomeIcon icon={faLink} />
        </div>
      );
    }

    return (
      <div className="nickname">
        {user.name || 'Anon'} <FontAwesomeIcon icon={faUser} />
      </div>
    );
  } else {
    return null;
  }
}

function Header({ cupId, user, isMachine, style }: HeaderProps) {
  const [register, setRegister] = useState(false);

  useEffect(() => {
    if (cupId === null || user !== null) {
      setRegister(false);
    }
  }, [cupId, user]);

  return (
    <>
      <header className={`accent1 ${style}`}>
        <div className="title">
          <h1 className="title">Hahnenschwanz</h1>
        </div>
        <div>
          {/*
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
          */}
        </div>
        <div className="userinfo">
          <UserInfo
            isMachine={isMachine}
            cupId={cupId}
            user={user}
            openRegisterDialog={() => [setRegister(true)]}
          />
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
            <div className="connect-qr">
              <QRCode
                size={200}
                level="H"
                value={`https://hahnenschwanz.com/${cupId}`}
                bgColor="var(--accent)"
                fgColor="var(--bg)"
              />
            </div>
          </div>
          <div>
            <div className="split-title">…oder öffne</div>
            <div className="connect-manual">
              <span className="connect-link">https://hahnenschwanz.com/</span>
              <span>
                klick dort auf <em>Becher registrieren</em> (oder auf deinen
                Namen um
                <br />
                einen weiteren Becher hinzuzufügen), und gib diesen Code ein
              </span>
              <span className="connect-code">{cupId}</span>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Header;
