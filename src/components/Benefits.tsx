import { CreditCard, Heart, Sprout, Truck } from 'lucide-react';

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
    <section className="benefits" aria-label="Por qué elegir Raíces">
      <div className="container benefits-inner">
        {benefits.map(({ icon: Icon, title, description }) => (
          <div className="benefit" key={title}>
            <Icon aria-hidden="true" />
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
