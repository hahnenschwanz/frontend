import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Cocktail } from "./model/Cocktail";
import "./OrderProgress.css";

interface OrderProgressProps {
  cocktail: Cocktail | null;
  progress: number;
  abortOrder: () => void;
}

function OrderProgress({ cocktail, progress, abortOrder }: OrderProgressProps) {
  const randomMesssage = () => {
    return messages[Math.trunc(Math.random() * messages.length)];
  };

  const [message, setMessage] = useState(randomMesssage());
  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(randomMesssage());
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="orderstate">
      <div className="cocktail">
        {cocktail?.imageUrl && <img src={cocktail.imageUrl} alt="" />}
        <div className="cocktail-info">
          <h2>{cocktail?.name || "Unbekannter Cocktail"}</h2>
          <div className="tags">{cocktail?.tags?.join(", ") || ""}</div>
        </div>
      </div>
      <div className="state">
        <span>{message}</span>
        <div className="progress-container">
          <button className="accent-error bordered" onClick={abortOrder}>
            Stopp <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
          <div className="progress-bar">
            <div
              className="progress-meter"
              id="progress"
              style={{
                inlineSize: `${progress}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OrderProgress;

const messages = [
  "Wer das liest ist doof",
  "Cocktail wird gemischt",
  "Schlucken nicht spucken",
  "Gift wird angemischt",
  "Würfelprobe auf Trinken",
  "Zyankali ausgewählt",
  "1% Spucke",
  "2% Abführmittel",
  "3% Spülmittel",
  "101% Spaß :-D",
  "Reinigungsmodus",
  "Bitte nicht trinken",
  "Dieser Cocktail ist alkoholfrei",
  "Menschen werden vergiftet",
  "Hilfe ich stecke in der Machine fest",
  "Das ist nur ein Traum",
  "Wach auf!",
  "Ich hab meine Hände nicht gewaschen",
  "Sahne ist Schmutz",
  "Sie haben gewonnnen: Nichts",
  "Sie steht auf dich",
  "Er steht auf dich",
  "Pflicht: Schrei wie ein Affe",
  "Pflicht: Tröte wie ein Elefant",
  "Pflicht: Muhe wie eine Kuh",
  "Pflicht: Quieke wie ein Schwein",
  "Pflicht: Heule wie ein Wolf",
  "Pflicht: Trink wie ein Pirat",
  "Pflicht: Mach Delfingeräusche",
  "Pflicht: Tanz!",
  "Fun fact: Elefanten fermentieren Früchte",
  "Fun fact: Chihuahua + Dachs = Chiweenie",
  "Don't drink and derive",
  "Asdf",
  "Möge die Macht mit dir sein",
  "Bugfrei seit 1903",
  "Letzter Betriebsunfall: 01 Tage",
  "Wololoo",
  "Don't Blink",
  "Aua, Finger eingeklemmt",
  "EXPLOSION!",
  "Dann hat es BOOM gemacht",
  "Trust me I'm an engineer",
  "OKKKK, letsgo!",
  "42",
  "There is no spoon",
  "I'm batman",
  "418 I'm a teapot",
  "Geschüttelt nicht gerührt",
  "Why is the rum gone?",
  "Den Zwölfen zum Gruße!",
  "Borbarad zum Gruße!",
  "Proletarier aller Länder vereinigt euch",
  "Wo ist dein Portemonnaie?",
  "Blau wie das Meer, voll wie unser Laderaum",
  "Hier könnte Ihre Werbung stehen",
  "Treffe Singles in deiner Umgebung",
  "Spiel wird geladen",
  "Letzte Runde",
  "Akku unter 10%",
  "Batterie leer",
  "Bitte Druckluft nachfüllen",
  "Bitte Schlauchenden kürzen",
  "Bitte Wasser befeuchten",
  "Alkohol trinken verboten",
  "Passwort gehackt: 1Qay2wsx3edc",
  "Passwort gehackt: qwertz",
  "Passwort gehackt: ficken",
  "Passwort gehackt: master",
  "Passwort gehackt: super123",
  "Passwort gehackt: matrix",
  "Passwort gehackt: sommer",
  "Vanilleeis leer",
  "Ich weiß was du gestern getan hast",
  "Hauptsache wir werden blauer",
  "Ich bin keine K.I.!",
  "Voice Chat aktiviert: Bitte laut reden",
  "💩",
  "Cake and grief counseling will be available",
];
