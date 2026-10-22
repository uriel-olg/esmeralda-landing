import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { iconButton } from '../styles/ui';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  id: string;
  children: ReactNode;
  className?: string;
  variant?: 'dialog' | 'cart';
}

export function Modal({ open, onClose, title, id, children, className = '', variant = 'dialog' }: Props) {
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
    <dialog ref={ref} className={`modal bg-cream text-ink p-0 shadow-[0_20px_100px_#14251b30] backdrop:bg-[#16231b65] backdrop:backdrop-blur-[4px] ${variant === 'cart' ? 'my-0 mr-0 ml-auto rounded-none w-[min(430px,100%)] h-dvh max-h-dvh border-0 border-l border-line open:flex open:flex-col' : 'm-auto rounded-[16px] border border-line w-[min(520px,calc(100%_-_32px))] max-h-[85dvh]'} ${className}`} aria-labelledby={`${id}-title`} onCancel={(event) => { event.preventDefault(); onClose(); }} onClose={() => { if (open) onClose(); }} onClick={(event) => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
    }}>
      <div className="modal-header flex items-center justify-between gap-[10px] pt-[24px] px-[25px] pb-[18px] border-b border-line mobile:p-[20px]"><h2 className="text-[32px] mobile:text-[29px]" id={`${id}-title`}>{title}</h2><button className={`icon-button ${iconButton}`} onClick={onClose} aria-label="Cerrar ventana"><X aria-hidden="true" /></button></div>
      {children}
    </dialog>
  );
}
