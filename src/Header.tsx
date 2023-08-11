import { faLink, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import Dialog from './Dialog';
import './Header.css';
import { User } from './model/User';
import Register from './Register';

interface HeaderProps {
  cupId: string | null;
  user: User | null;
  isMachine: boolean;
  style?: string;
  openAdminDialog: () => void;
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

function Header({
  cupId,
  user,
  isMachine,
  style,
  openAdminDialog,
}: HeaderProps) {
  const longclickTimerRef = useRef<NodeJS.Timer | null>();
  const [register, setRegister] = useState(false);

  useEffect(() => {
    if (cupId === null || user !== null) {
      setRegister(false);
    }
  }, [cupId, user]);

  const touchStart = () => {
    longclickTimerRef.current = setTimeout(() => {
			openAdminDialog();
      longclickTimerRef.current = null;
    }, 2000);
  };

  const touchEnd = () => {
    if (longclickTimerRef.current) {
      clearTimeout(longclickTimerRef.current);
      longclickTimerRef.current = null;
    }
  };

  return (
    <>
      <header className={`accent1 ${style}`}>
        <div className="title">
          <h1
            className="title"
            onTouchStart={touchStart}
            onTouchEnd={touchEnd}
            onMouseDown={touchStart}
            onMouseUp={touchEnd}
          >
            Hahnenschwanz
          </h1>
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
        <Register cupId={cupId || ''} />
      </Dialog>
    </>
  );
}

export default Header;
