import { Reveal } from "./Reveal";
import { FedeltaSubscribeCTA } from "./FedeltaWhatsappModal";

export function PrioritySection() {
  return (
    <section id="pelle-priority" className="relative overflow-hidden bg-[#0d1117] px-4 py-20 sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#d32f2f]/12 blur-[90px]" />
        <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-[#1565c0]/12 blur-[80px]" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#90caf9]">
            Programma fedeltà
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            P.ELLE Priority: La Tua Fedeltà Merita la Massima Priorità.
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-400">
            Creato per ringraziare le carrozzerie partner e i clienti storici. Accesso a listini
            riservati, consulenza tecnica prioritaria e promozioni esclusive.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Listini riservati",
              text: "Condizioni dedicate su miscelazione e ricambi ricorrenti, con trasparenza sui listini partner.",
            },
            {
              title: "Consulenza prioritaria",
              text: "Canale preferenziale per urgenze produttive e supporto tecnico quando la cabina è al completo.",
            },
            {
              title: "Promozioni esclusive",
              text: "Anteprime, bundle e iniziative dedicate a chi lavora con noi nel tempo.",
            },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 shadow-inner">
                <div className="mb-4 h-1 w-10 rounded-full bg-gradient-to-r from-[#d32f2f] to-[#1565c0]" />
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{card.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-12 rounded-2xl border border-[#d32f2f]/30 bg-[#d32f2f]/5 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <p className="max-w-2xl text-sm leading-relaxed text-zinc-200 sm:text-base">
              Vuoi entrare in <strong className="text-white">P.ELLE Priority</strong>? Compila il
              modulo: inviamo una richiesta strutturata su WhatsApp al nostro team per valutare
              insieme il profilo dedicato.
            </p>
            <FedeltaSubscribeCTA />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
