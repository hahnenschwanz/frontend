import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef } from "react";
import "./Dialog.css";

function Dialog({ open, title, children, onDismiss }) {
  let dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) {
      dialog.showModal();
      dialog.classList.add("animate");
    } else if (!open && dialog.open) {
      dialog.classList.remove("animate");
      setTimeout(() => dialog.close(), 100);
    }
  }, [open, dialogRef]);

  const onClick = useCallback(
    (event) => {
      if (event.target === dialogRef.current) {
        onDismiss();
      }
    },
    [dialogRef]
  );

  return (
    <dialog ref={dialogRef} open onClick={onClick}>
      <div>
        <h1>{title}</h1>
        <FontAwesomeIcon
          className="close"
          size="lg"
          icon={faXmark}
          onClick={onDismiss}
        />
        {children}
      </div>
    </dialog>
  );
}

export default Dialog;
