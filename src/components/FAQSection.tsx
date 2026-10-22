import { ArrowRight, Plus, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { frequentlyAskedQuestions } from '../data/faqs';

export function FAQSection() {
  return (
    <section className="faq-section section container" id="preguntas-frecuentes" aria-labelledby="faq-title">
      <div className="faq-layout">
        <div className="faq-intro">
          <p className="eyebrow">Siempre hay lugar para una pregunta</p>
          <h2 id="faq-title">Antes de empezar<br /><em>la próxima ronda.</em></h2>
          <p>Elegir, preparar y cuidar. Algunas respuestas para que disfrutes cada mate, desde el primero.</p>
          <div className="faq-note"><Sprout aria-hidden="true" /><span>Un buen ritual se aprende compartiendo.</span></div>
          <Link className="text-link" to="/catalogo">Encontrá tu compañero de ronda <ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="faq-list">
          {frequentlyAskedQuestions.map(({ id, question, answer }) => (
            <details key={id} className="faq-item" name="preguntas-materas">
              <summary id={`faq-${id}`}><span>{question}</span><Plus aria-hidden="true" /></summary>
              <div className="faq-answer"><p>{answer}</p>{id === 'regalos' && <Link to="/catalogo?categoria=Regalos" className="text-link">Ver regalos <ArrowRight aria-hidden="true" /></Link>}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
