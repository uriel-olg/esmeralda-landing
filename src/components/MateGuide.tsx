import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, Droplets, Leaf, Sprout, ThermometerSun, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type GuideStep = {
  title: string;
  description: string;
};

type GuideTopic = {
  id: string;
  label: string;
  icon: LucideIcon;
  heading: string;
  steps: readonly GuideStep[];
  tip: string;
  link: string;
  linkLabel: string;
};

const guideTopics: readonly GuideTopic[] = [
  {
    id: 'elegir',
    label: 'Elegir tu mate',
    icon: Sprout,
    heading: 'Un mate que vaya con vos.',
    steps: [
      {
        title: 'Empezá por el material',
        description: 'Calabaza para un ritual clásico; acero o cerámica si preferís una limpieza más sencilla. Cada material tiene sus propios cuidados.',
      },
      {
        title: 'Encontrá tu medida',
        description: 'Pensá si lo disfrutás a solas o en una ronda. El tamaño y una forma cómoda para tu mano hacen la diferencia en el día a día.',
      },
      {
        title: 'Antes de la primera cebada',
        description: 'Los mates de calabaza suelen necesitar curado. Seguí siempre las instrucciones de quien lo fabrica; no todos los materiales se preparan igual.',
      },
    ],
    tip: 'El mejor mate es el que se adapta a tu forma de disfrutarlo.',
    link: '/catalogo?categoria=Mates',
    linkLabel: 'Encontrá tu mate',
  },
  {
    id: 'preparar',
    label: 'Preparar la ronda',
    icon: ThermometerSun,
    heading: 'El secreto está en los pequeños gestos.',
    steps: [
      {
        title: 'El agua, a punto',
        description: 'Como referencia, prepará el agua entre 75 y 80 °C y evitá que hierva. Un termo te ayuda a mantener la temperatura durante la ronda.',
      },
      {
        title: 'Dale lugar a la yerba',
        description: 'Comenzá llenando unas tres cuartas partes del mate. Incliná la yerba hacia un costado para dejar un espacio donde cebar.',
      },
      {
        title: 'Una cebada, sin apuro',
        description: 'Humedecé ese espacio con un poquito de agua tibia, colocá la bombilla y cebá allí con el agua caliente. Evitá mover la bombilla a cada rato.',
      },
    ],
    tip: 'Ajustá la cantidad de yerba y el ritmo de las cebadas a tu gusto. La ronda es tuya.',
    link: '/catalogo?categoria=Yerbas',
    linkLabel: 'Elegí tu próxima yerba',
  },
  {
    id: 'cuidar',
    label: 'Cuidarlo cada día',
    icon: Droplets,
    heading: 'Un compañero para muchas rondas.',
    steps: [
      {
        title: 'Después del último mate',
        description: 'Retirá la yerba al terminar y enjuagá el recipiente con agua tibia. No dejes la yerba húmeda de un día para el otro.',
      },
      {
        title: 'Cada material tiene su cuidado',
        description: 'En calabaza, evitá el detergente y los remojos prolongados. Para acero, vidrio o cerámica, seguí las indicaciones de limpieza del fabricante.',
      },
      {
        title: 'Dejalo respirar',
        description: 'Dejá que se seque por completo en un lugar ventilado antes de guardarlo. La bombilla también necesita limpieza regular según su material.',
      },
    ],
    tip: 'Conocé tu mate: las indicaciones del artesano o fabricante son siempre la primera referencia.',
    link: '/catalogo?categoria=Mates',
    linkLabel: 'Conocé nuestros mates',
  },
];

export function MateGuide() {
  const prefix = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [verticalTabs, setVerticalTabs] = useState(() => window.matchMedia('(min-width: 641px)').matches);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 641px)');
    const updateOrientation = () => setVerticalTabs(media.matches);
    media.addEventListener('change', updateOrientation);
    return () => media.removeEventListener('change', updateOrientation);
  }, []);

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    let nextIndex: number;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (index + 1) % guideTopics.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (index - 1 + guideTopics.length) % guideTopics.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = guideTopics.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section className="mate-guide" id="guia" aria-labelledby={`${prefix}-title`}>
      <div className="container guide-layout">
        <div className="guide-intro">
          <p className="eyebrow">Un poquito de saber matero</p>
          <h2 id={`${prefix}-title`}>Tu ritual,<br /><em>a tu manera.</em></h2>
          <p>No hay una sola manera de tomar mate. Hay pequeños detalles que te ayudan a encontrar la tuya, desde la primera cebada.</p>
          <div className="guide-tabs" role="tablist" aria-label="Guía para disfrutar tu mate" aria-orientation={verticalTabs ? 'vertical' : 'horizontal'}>
            {guideTopics.map(({ id, label, icon: Icon }, index) => (
              <button
                className={`guide-tab${activeIndex === index ? ' active' : ''}`}
                id={`${prefix}-tab-${id}`}
                key={id}
                ref={(element) => { tabRefs.current[index] = element; }}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls={`${prefix}-panel-${id}`}
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
                <ArrowRight aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        <div className="guide-content">
          {guideTopics.map((topic, index) => (
            <div
              className="guide-panel"
              id={`${prefix}-panel-${topic.id}`}
              key={topic.id}
              role="tabpanel"
              aria-labelledby={`${prefix}-tab-${topic.id}`}
              hidden={activeIndex !== index}
              tabIndex={0}
            >
              <h3>{topic.heading}</h3>
              <ol className="guide-steps">
                {topic.steps.map((step, stepIndex) => (
                  <li className="guide-step" key={step.title}>
                    <span className="guide-number" aria-hidden="true">0{stepIndex + 1}</span>
                    <div className="guide-step-copy">
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="guide-tip"><Leaf aria-hidden="true" /><span>{topic.tip}</span></p>
              <div className="guide-actions">
                <Link className="text-link" to={topic.link}>{topic.linkLabel}<ArrowRight aria-hidden="true" /></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
