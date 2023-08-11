import './Register.css';
import QRCode from 'react-qr-code';

interface RegisterProps {
  cupId: string;
}

function Register({ cupId }: RegisterProps) {
  return (
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
            klick dort auf <em>Becher registrieren</em> (oder auf deinen Namen
            um einen weiteren Becher hinzuzufügen), und gib diesen Code ein
          </span>
          <span className="connect-code">{cupId}</span>
        </div>
      </div>
    </div>
  );
}

export default Register;
