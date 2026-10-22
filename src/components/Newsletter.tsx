import { useId, useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { container } from '../styles/ui';

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
    <section className={`${container} newsletter flex items-center justify-between gap-[30px] border-b border-line py-[38px] mobile:flex-col mobile:items-stretch mobile:gap-[15px] mobile:py-[29px]`} aria-labelledby="newsletter-title">
      <div>
        <h2 className="text-[32px] tracking-[-1px] tablet:text-[28px] mobile:text-[31px] mobile:tracking-[-.7px]" id="newsletter-title">Que no se corte la ronda.</h2>
        <p className="mt-[6px] text-[11px] text-muted mobile:text-[10px]">Ideas, novedades y un poquito de nuestra tradición en tu correo.</p>
      </div>
      <div className="newsletter-signup w-full max-w-[420px] flex-1 tablet:max-w-[300px] mobile:max-w-none mobile:flex-none">
        <form className="newsletter-form flex max-w-none items-center gap-[8px]" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor={emailId}>Tu correo electrónico</label>
          <input
            className="min-w-0 w-full rounded-none border-x-0 border-t-0 border-b border-[#89967d] bg-transparent px-0 py-[12px] text-[12px]"
            id={emailId}
            name="email"
            type="email"
            placeholder="Tu correo electrónico"
            autoComplete="email"
            aria-describedby={noteId}
            required
            onInput={() => setSubmitted(false)}
          />
          <button className="border-b border-[#89967d] bg-transparent p-[12px] text-forest" type="submit" aria-label="Probar suscripción a novedades">
            <ArrowRight aria-hidden="true" />
          </button>
        </form>
        <p className="newsletter-note mt-[6px] text-[10px] text-muted" id={noteId}>
          Formulario de ejemplo. No envía ni almacena tu correo.
        </p>
        <p className="newsletter-status mt-[6px] flex min-h-[18px] items-center gap-[8px] text-[11px] text-forest mobile:text-[10px]" role="status">
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
