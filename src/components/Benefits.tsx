import { CreditCard, Heart, Sprout, Truck } from 'lucide-react';
import { container } from '../styles/ui';

const benefits = [
  {
    icon: Sprout,
    title: 'Calidad en cada detalle',
    description: 'Seleccionamos lo que compartimos.',
  },
  {
    icon: Truck,
    title: 'Coordinamos tu entrega',
    description: 'Consultá las opciones disponibles.',
  },
  {
    icon: CreditCard,
    title: 'Comprá con tranquilidad',
    description: 'Efectivo, transferencia y más.',
  },
  {
    icon: Heart,
    title: 'Estamos para ayudarte',
    description: 'Atención de persona a persona.',
  },
] as const;

export function Benefits() {
  return (
    <section className="benefits border-y border-[#e0e3d4] bg-[#eeefe5]" aria-label="Por qué elegir Raíces">
      <div className={`${container} benefits-inner grid grid-cols-4 py-[28px] tablet:grid-cols-2 tablet:gap-[23px] tablet:py-[25px] mobile:gap-x-[12px] mobile:gap-y-[22px] mobile:py-[26px]`}>
        {benefits.map(({ icon: Icon, title, description }, index) => (
          <div className={`benefit flex items-center gap-[13px] ${index === 0 ? 'justify-start border-r border-[#d7dccb] pr-[17px] pl-0' : index === benefits.length - 1 ? 'justify-center border-0 pr-0 pl-[17px]' : 'justify-center border-r border-[#d7dccb] px-[17px]'} compact:gap-[9px] compact:px-[10px] tablet:justify-start tablet:border-0 tablet:px-[15px] mobile:gap-[9px] mobile:px-0`} key={title}>
            <Icon className="h-[28px] w-[28px] text-forest compact:w-[25px] tablet:w-[27px] mobile:h-[24px] mobile:w-[24px]" aria-hidden="true" />
            <div>
              <h3 className="text-[11px] font-medium compact:text-[10px] tablet:text-[11px] mobile:text-[9px] small:text-[8px]">{title}</h3>
              <p className="mt-[2px] text-[9px] text-muted compact:text-[8px] tablet:text-[9px] mobile:text-[8px] small:text-[7px]">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
