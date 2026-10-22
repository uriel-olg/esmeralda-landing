import { ArrowRight, Plus, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { frequentlyAskedQuestions } from '../data/faqs';
import { container, eyebrow, textLink } from '../styles/ui';

export function FAQSection() {
  return (
    <section className={`faq-section section ${container} border-t border-line py-[64px] tablet:py-[48px] mobile:py-[36px]`} id="preguntas-frecuentes" aria-labelledby="faq-title">
      <div className="faq-layout grid grid-cols-[.85fr_1.3fr] items-start gap-[75px] compact:gap-[45px] tablet:grid-cols-[1fr_1.35fr] tablet:gap-[28px] mobile:grid-cols-1 mobile:gap-[26px]">
        <div className="faq-intro">
          <p className={`eyebrow ${eyebrow} mobile:text-[8px] mobile:tracking-[1.7px]`}>Siempre hay lugar para una pregunta</p>
          <h2 className="mt-[16px] mb-[20px] text-[44px] leading-[1.06] tablet:text-[37px] mobile:mt-[13px] mobile:mb-[17px] mobile:text-[39px]" id="faq-title">Antes de empezar<br /><em className="font-medium text-forest">la próxima ronda.</em></h2>
          <p className="max-w-[310px] text-[13px] leading-[1.85] text-muted tablet:text-[12px] mobile:max-w-[330px]">Elegir, preparar y cuidar. Algunas respuestas para que disfrutes cada mate, desde el primero.</p>
          <div className="faq-note mt-[24px] mb-[17px] flex max-w-[270px] items-center gap-[11px] text-[11px] text-olive mobile:mt-[17px] mobile:mb-[12px] mobile:max-w-none mobile:text-[10px]"><Sprout className="size-[27px]" aria-hidden="true" /><span>Un buen ritual se aprende compartiendo.</span></div>
          <Link className={`text-link ${textLink} tablet:max-w-[230px] tablet:whitespace-normal mobile:max-w-none`} to="/catalogo">Encontrá tu compañero de ronda <ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="faq-list border-t border-[#d6dccb]">
          {frequentlyAskedQuestions.map(({ id, question, answer }) => (
            <details key={id} className="faq-item group border-b border-[#d6dccb]" name="preguntas-materas">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-[20px] px-[3px] py-[22px] text-[13px] font-medium focus-visible:rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive [&::-webkit-details-marker]:hidden mobile:gap-[15px] mobile:py-[20px] mobile:text-[12px]" id={`faq-${id}`}><span>{question}</span><Plus className="size-[17px] text-forest [transition:transform_.2s] group-open:[transform:rotate(45deg)]" aria-hidden="true" /></summary>
              <div className="faq-answer pr-[27px] pb-[23px] pl-[3px] text-[12px] leading-[1.9] text-muted mobile:pr-[22px] mobile:text-[11px]"><p>{answer}</p>{id === 'regalos' && <Link to="/catalogo?categoria=Regalos" className={`text-link ${textLink} mt-[12px]`}>Ver regalos <ArrowRight aria-hidden="true" /></Link>}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
