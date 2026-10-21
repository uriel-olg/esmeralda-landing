import { useId, useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export function Newsletter() {
  const emailId = useId();
  const noteId = useId();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setSubmitted(true);
  }

  return (
    <section className="container newsletter" aria-labelledby="newsletter-title">
      <div>
        <h2 id="newsletter-title">Que no se corte la ronda.</h2>
        <p>Ideas, novedades y un poquito de nuestra tradición en tu correo.</p>
      </div>
      <div className="newsletter-signup w-full max-w-[420px] flex-1 max-sm:max-w-none">
        <form className="newsletter-form !max-w-none" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor={emailId}>Tu correo electrónico</label>
          <input
            id={emailId}
            name="email"
            type="email"
            placeholder="Tu correo electrónico"
            autoComplete="email"
            aria-describedby={noteId}
            required
            onInput={() => setSubmitted(false)}
          />
          <button type="submit" aria-label="Probar suscripción a novedades">
            <ArrowRight aria-hidden="true" />
          </button>
        </form>
        <p className="newsletter-note text-[10px]" id={noteId}>
          Formulario de ejemplo. No envía ni almacena tu correo.
        </p>
        <p className="newsletter-status flex items-center gap-2 text-[11px]" role="status">
          {submitted && (
            <>
              <Check className="!h-3.5 !w-3.5" aria-hidden="true" />
              Así se verá tu suscripción. No guardamos tu correo en esta demostración.
            </>
          )}
        </p>
      </div>
    </section>
  );
}
