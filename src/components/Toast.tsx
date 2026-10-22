import { Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export function Toast() {
  const { toast } = useShop();
  return <div className={`toast fixed bottom-[24px] left-1/2 bg-forest text-white flex items-center gap-[12px] py-[14px] px-[22px] border border-[#ffffff30] shadow-[0_8px_30px_#13281e2b] rounded-[9px] text-[12px] z-[100] pointer-events-none [transition:opacity_.2s,transform_.2s] max-w-[calc(100%_-_32px)] w-max [&_svg]:size-[18px] mobile:text-[11px] mobile:py-[13px] mobile:px-[16px] mobile:bottom-[18px] ${toast ? 'visible opacity-100 [transform:translate(-50%,0)]' : 'opacity-0 [transform:translate(-50%,20px)]'}`} role="status" aria-live="polite" aria-atomic="true">{toast && <><Check aria-hidden="true" /><span key={toast.id}>{toast.message}</span></>}</div>;
}
