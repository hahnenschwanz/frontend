import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ReactNode,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import './Dialog.css';

interface DialogProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onDismiss: () => void;
}

function Dialog({ open, title, children, onDismiss }: DialogProps) {
  let dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (open && !dialog.open) {
      dialog.showModal();
      dialog.classList.add('animate');
    } else if (!open && dialog.open) {
      dialog.classList.remove('animate');
      setTimeout(() => dialog.close(), 100);
    }
  }, [open, dialogRef]);

  const dismiss = useCallback(
    (event: SyntheticEvent<Element, Event>) => {
      event.preventDefault();
      if (onDismiss) {
        onDismiss();
      }
    },
    [onDismiss]
  );

  const onClick = useCallback(
    (event: SyntheticEvent<Element, Event>) => {
      if (event.target === dialogRef.current) {
        onDismiss();
      }
    },
    [onDismiss]
  );

  return (
    <dialog ref={dialogRef} onClick={onClick} onCancel={dismiss}>
      {open ? (
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
      ) : null}
    </dialog>
  );
}

export default Dialog;
