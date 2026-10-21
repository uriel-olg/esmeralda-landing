import { Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export function Toast() {
  const { toast } = useShop();
  return <div className={`toast ${toast ? 'visible' : ''}`} role="status" aria-live="polite" aria-atomic="true">{toast && <><Check aria-hidden="true" /><span key={toast.id}>{toast.message}</span></>}</div>;
}
