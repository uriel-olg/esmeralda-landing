import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  id: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, id, children, className = '' }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
    if (open) document.body.classList.add('locked');
    return () => document.body.classList.remove('locked');
  }, [open]);

  return (
    <dialog ref={ref} className={`modal ${className}`} aria-labelledby={`${id}-title`} onCancel={(event) => { event.preventDefault(); onClose(); }} onClose={() => { if (open) onClose(); }} onClick={(event) => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
    }}>
      <div className="modal-header"><h2 id={`${id}-title`}>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Cerrar ventana"><X aria-hidden="true" /></button></div>
      {children}
    </dialog>
  );
}
