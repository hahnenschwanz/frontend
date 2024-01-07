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

const containsPlainText: (message: string) => boolean = (message: string) => {
  return /[a-zA-Z0-9.-]/.test(message);
};

function OrderProgress({ cocktail, progress, abortOrder }: OrderProgressProps) {
  const randomMesssage = () => {
    return messages[Math.trunc(Math.random() * messages.length)];
  };

  const [message, setMessage] = useState(randomMesssage());
  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(randomMesssage());
    }, 21000);
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
        <span className={containsPlainText(message) ? "" : "large-message"}>
          {message}
        </span>
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
  "Alles Gute zum Geburtstag!",
  "Alles Gute zum Geburtstag!",
  "Alles Gute zum Geburtstag!",
  "Alles Gute zum Geburtstag!",
  "Alles Gute zum Geburtstag!",
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
  "Reste werden eingegossen",
  "Bitte nicht trinken",
  "Menschen werden vergiftet",
  "Hilfe ich stecke in der Machine fest",
  "Das ist nur ein Traum",
  "Wach auf!",
  "Ich hab meine Hände nicht gewaschen",
  "Ich weiß nicht was ich hier tue",
  "Sahne ist Schmutz",
  "Sie haben gewonnnen: Nichts",
  "Sie steht auf dich",
  "Na los, trau dich und schreib ihr",
  "Er steht auf dich",
  "Na los, trau dich und schreib ihm",
  "Bitte hier unterschreiben: _________________ ",
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
  "Fun fact: Ein Kilogramm Muskelmasse verbraucht pro Jahr 36.000 Kalorien",
  "Fun fact: New York City liegt südlicher als Rom",
  "Don't drink and drive",
  "Asdf",
  "Möge dieser Cocktail mit dir sein",
  "Bugfrei seit 1903",
  "Lade Entschuldingsschreiben von Mama",
  "Ruf doch mal deine Mama an.      Aber besser erst morgen ;)",
  "Ruf doch mal dein Papa an.      Aber besser erst morgen ;)",
  "Letzter Betriebsunfall: 01 Tage",
  "Wololoo",
  "Achja, komm ma her du",
  "Aktuelle Geschwindigkeit: 88mph (140km/h)",
  "Zeitsprung wird durchgeführt. Ziel: jetzt + 20s",
  "Dieser Cocktail benötig 1,21 Gigawatt Leistung",
  "Don't Blink",
  "Aua, Finger eingeklemmt",
  "EXPLOSION! 💥💥💥",
  "Dann hat es BOOM gemacht",
  "Trust me I'm an engineer",
  "OOOOkay, letsgo!",
  "Bitte Pin eingen",
  "Einmal einsteigen bitte",
  "Bitte lächeln",
  "Verbinde zum Notruf...",
  "Selfie wird hochgeladen",
  "Alterskontrolle 🛂 Bitte Ausweis vorzeigen",
  "42",
  "There is no spoon",
  "I'm batman",
  "418 I'm a teapot",
  "Geschüttelt nicht gerührt",
  "Why is the rum gone?",
  "Den Zwölfen zum Gruße!",
  "Borbarad zum Gruße!",
  "Gondor Primulon",
  "Proletarier aller Länder vereinigt euch",
  "Wo ist dein Portemonnaie?",
  "Blau wie das Meer, voll wie unser Laderaum",
  "Hier könnte Ihre Werbung stehen",
  "Treffe Singles in deiner Umgebung",
  "Spiel wird geladen",
  "Cocktail wird geladen",
  "Letzte Runde",
  "Akku unter 10%",
  "Batterie leer 🪫",
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
  "🔥🔥🔥",
  "💯",
  "🇺🇦",
  "🦾",
  "📵",
  "🖖",
  "🛸",
  "🚀",
  "☣️",
  "🔞",
  "🟥🟧🟨🟩🟦🟪",
  "Made ❤️ with in 🇩🇪",
  "Cake and grief counseling will be available",
];
