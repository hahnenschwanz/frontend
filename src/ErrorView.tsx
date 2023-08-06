import { useEffect } from "react";
import "./ErrorView.css";

interface ErrorViewProps {
  error: Error;
}

const RecursiveErrors = ({ error }: { error: Error }) => {
  return (
    <>
      {error.message}
      {"\n"}
      {error.cause && (error.cause as Error).message ? (
        <RecursiveErrors error={error.cause as Error}></RecursiveErrors>
      ) : null}
    </>
  );
};

function ErrorView({ error }: ErrorViewProps) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.reload();
    }, 10000);
    return () => clearTimeout(timeout);
  });

  return (
    <main className="fullscreen-error colors-error">
      <div>
        <>
          <h2>Systemfehler: {error.message}</h2>
          {error.cause && (
            <pre>
              <RecursiveErrors error={error.cause as Error} />
            </pre>
          )}
        </>
      </div>
    </main>
  );
}

export default ErrorView;
