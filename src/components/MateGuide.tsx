import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, Droplets, Leaf, Sprout, ThermometerSun, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { container, eyebrow, textLink } from '../styles/ui';

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
    <section className="mate-guide border-b border-line bg-[#f4f2e9] py-[72px] tablet:py-[48px] mobile:py-[36px]" id="guia" aria-labelledby={`${prefix}-title`}>
      <div className={`${container} guide-layout grid grid-cols-[.85fr_1.3fr] items-start gap-[75px] compact:gap-[45px] tablet:grid-cols-[1fr_1.35fr] tablet:gap-[28px] mobile:grid-cols-1 mobile:gap-[27px]`}>
        <div className="guide-intro">
          <p className={`eyebrow ${eyebrow} mobile:text-[8px] mobile:tracking-[1.7px]`}>Un poquito de saber matero</p>
          <h2 className="mt-[15px] mb-[19px] text-[52px] leading-[1.03] tablet:text-[45px] mobile:mt-[13px] mobile:mb-[16px] mobile:text-[43px]" id={`${prefix}-title`}>Tu ritual,<br /><em className="font-medium text-forest">a tu manera.</em></h2>
          <p className="max-w-[320px] text-[13px] leading-[1.85] text-muted tablet:text-[12px] mobile:max-w-[340px]">No hay una sola manera de tomar mate. Hay pequeños detalles que te ayudan a encontrar la tuya, desde la primera cebada.</p>
          <div className="guide-tabs mt-[26px] flex max-w-[330px] flex-col gap-[8px] mobile:mt-[21px] mobile:max-w-none mobile:flex-row mobile:gap-[5px]" role="tablist" aria-label="Guía para disfrutar tu mate" aria-orientation={verticalTabs ? 'vertical' : 'horizontal'}>
            {guideTopics.map(({ id, label, icon: Icon }, index) => (
              <button
                className={`guide-tab flex items-center gap-[12px] rounded-[7px] border px-[15px] py-[13px] text-left text-[12px] [transition:background_.2s,border-color_.2s] tablet:gap-[9px] tablet:p-[12px] tablet:text-[11px] mobile:min-w-0 mobile:flex-1 mobile:justify-center mobile:gap-[6px] mobile:px-[6px] mobile:py-[11px] mobile:text-[9px] mobile:leading-[1.5] small:flex-col small:gap-[5px] ${activeIndex === index ? 'active border-forest bg-forest text-paper' : 'border-transparent bg-transparent text-[#56644f] [&:hover]:border-[#d4dccb] [&:hover]:bg-[#e8ecdf]'}`}
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
                <Icon className="h-[20px] w-[20px] mobile:h-[17px] mobile:w-[17px]" aria-hidden="true" />
                <span>{label}</span>
                <ArrowRight className="ml-auto h-[16px] w-[16px] mobile:hidden" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        <div className="guide-content">
          {guideTopics.map((topic, index) => (
            <div
              className="guide-panel min-h-[453px] rounded-[14px] border border-[#e3e5d7] bg-paper px-[33px] pt-[30px] pb-[25px] focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-olive compact:p-[27px] tablet:min-h-[490px] tablet:px-[22px] tablet:py-[24px] mobile:min-h-[450px] mobile:px-[20px] mobile:pt-[24px] mobile:pb-[21px] small:px-[17px]"
              id={`${prefix}-panel-${topic.id}`}
              key={topic.id}
              role="tabpanel"
              aria-labelledby={`${prefix}-tab-${topic.id}`}
              hidden={activeIndex !== index}
              tabIndex={0}
            >
              <h3 className="mb-[25px] font-display text-[29px] leading-[1.15] font-medium tracking-[-.4px] tablet:text-[27px] mobile:mb-[23px] mobile:text-[28px]">{topic.heading}</h3>
              <ol className="guide-steps flex list-none flex-col gap-[21px] p-0 mobile:gap-[20px]">
                {topic.steps.map((step, stepIndex) => (
                  <li className="guide-step flex items-start gap-[17px] tablet:gap-[11px] mobile:gap-[13px]" key={step.title}>
                    <span className="guide-number pt-[1px] font-display text-[30px] leading-none font-medium text-[#9ba585] tablet:text-[27px]" aria-hidden="true">0{stepIndex + 1}</span>
                    <div className="guide-step-copy">
                      <h4 className="mb-[4px] text-[12px] font-medium">{step.title}</h4>
                      <p className="text-[12px] leading-[1.85] text-muted tablet:text-[11px]">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="guide-tip mt-[22px] flex items-start gap-[9px] border-t border-line pt-[17px] text-[10px] leading-[1.75] text-olive"><Leaf className="mt-[2px] h-[16px] w-[16px]" aria-hidden="true" /><span>{topic.tip}</span></p>
              <div className="guide-actions mt-[10px] pl-[25px]">
                <Link className={`text-link ${textLink}`} to={topic.link}>{topic.linkLabel}<ArrowRight aria-hidden="true" /></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
