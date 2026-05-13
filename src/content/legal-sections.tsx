import Link from "next/link";

export function TitolareDelTrattamento() {
  return (
    <section className="scroll-mt-28">
      <h2 className="text-xl font-semibold text-white sm:text-2xl">Titolare del trattamento</h2>
      <p className="mt-3 text-zinc-300">
        Il titolare del trattamento dei dati personali è l&apos;impresa indicata di seguito, cui
        rivolgersi per ogni richiesta relativa alla presente informativa o all&apos;esercizio dei
        diritti privacy.
      </p>
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-300 sm:p-5 sm:text-base">
        <p>
          <strong className="text-white">Ragione sociale:</strong> P.ELLE VERNICI DI PINTO LAURA
        </p>
        <p className="mt-2">
          <strong className="text-white">P.IVA:</strong> 01440270625
        </p>
        <p className="mt-2">
          <strong className="text-white">Sede legale / operativa:</strong> Via Napoli Parco Appia
          236, 82100 Benevento (BN)
        </p>
        <p className="mt-2">
          <strong className="text-white">Tel.:</strong>{" "}
          <a className="text-[#93c5fd] underline" href="tel:+393471841667">
            +39 347 184 1667
          </a>
        </p>
        <p className="mt-2">
          <strong className="text-white">Email:</strong>{" "}
          <a className="text-[#93c5fd] underline" href="mailto:p.ellevernici@gmail.com">
            p.ellevernici@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}

export function PrivacyPolicyBody() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Premessa e ambito</h2>
        <p className="mt-3 text-zinc-300">
          La presente informativa descrive le modalità di trattamento dei dati personali raccolti
          tramite il sito web, i canali digitali ad esso collegati (es. moduli, email, messaggistica
          istantanea qualora utilizzata per finalità connesse al rapporto con l&apos;impresa) e le
          interazioni con i servizi resi da P.ELLE Vernici &amp; Ricambi, in conformità al Regolamento
          (UE) 2016/679 (&quot;GDPR&quot;) e alla normativa nazionale applicabile in materia di protezione
          dei dati personali e di cookie.
        </p>
        <p className="mt-3 text-zinc-300">
          L&apos;informativa riguarda esclusivamente questo sito e non anche siti di terzi eventualmente
          raggiungibili tramite link esterni, per i quali si rimanda alle rispettive informative.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          Tipologie di utenti e trattamenti
        </h2>
        <p className="mt-3 text-zinc-300">
          Il sito può essere consultato da visitatori interessati ai servizi (es. carrozzerie,
          professionisti, privati) che compilano moduli, inviano email o contattano telefonicamente /
          tramite applicazioni di messaggistica. I dati conferiti volontariamente sono trattati per
          dare riscontro alle richieste e per le finalità connesse alla gestione del rapporto
          commerciale o precontrattuale.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Finalità e basi giuridiche</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-300">
          <li>
            <strong className="text-zinc-100">Gestione richieste, preventivi e ordini</strong> — base
            giuridica: esecuzione di misure precontrattuali o contrattuali (art. 6(1)(b) GDPR).
          </li>
          <li>
            <strong className="text-zinc-100">Adempimenti contabili, fiscali e di legge</strong> — base
            giuridica: obbligo legale (art. 6(1)(c) GDPR).
          </li>
          <li>
            <strong className="text-zinc-100">Sicurezza del sito, prevenzione frodi e abusi</strong> —
            base giuridica: legittimo interesse (art. 6(1)(f) GDPR), nel rispetto dei diritti
            dell&apos;interessato.
          </li>
          <li>
            <strong className="text-zinc-100">Comunicazioni promozionali</strong> — solo previo
            consenso espresso ove richiesto dalla legge (art. 6(1)(a) GDPR), con possibilità di
            revoca in ogni momento.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Categorie di dati trattati</h2>
        <p className="mt-3 text-zinc-300">
          Dati identificativi e di contatto, contenuti delle comunicazioni, dati relativi al veicolo
          o alla commessa forniti volontariamente, nonché dati tecnici di navigazione (es. indirizzo
          IP, log di sistema, data/ora di accesso) necessari alla sicurezza informatica e al
          funzionamento del servizio.
        </p>
        <p className="mt-3 text-zinc-300">
          Non è prevista la raccolta sistematica di categorie particolari di dati (art. 9 GDPR) salvo
          che l&apos;utente includa tali informazioni spontaneamente nella richiesta: in tal caso i dati
          saranno trattati nel rispetto della normativa applicabile.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          Modalità del trattamento e conservazione
        </h2>
        <p className="mt-3 text-zinc-300">
          Il trattamento avviene mediante strumenti elettronici e telematici, con misure tecniche e
          organizzative idonee a garantire un livello di sicurezza adeguato al rischio. I dati sono
          conservati per il tempo strettamente necessario alle finalità perseguite e, comunque, nei
          limiti imposti dalla legge per obblighi documentali e per la tutela di eventuali
          controversie.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          Comunicazione, responsabili e trasferimenti
        </h2>
        <p className="mt-3 text-zinc-300">
          I dati non sono diffusi. Possono essere comunicati a soggetti terzi che forniscono servizi
          strumentali (es. hosting, manutenzione IT, consulenti) nominati responsabili del trattamento
          ove necessario. Eventuali trasferimenti di dati verso Paesi extra-UE avverranno solo in
          presenza di garanzie adeguate ai sensi degli artt. 44–49 GDPR.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Diritti dell&apos;interessato</h2>
        <p className="mt-3 text-zinc-300">
          L&apos;interessato può esercitare i diritti di accesso, rettifica, cancellazione, limitazione,
          opposizione, portabilità e revoca del consenso (ove applicabile) inviando una richiesta a{" "}
          <a className="text-[#93c5fd] underline" href="mailto:p.ellevernici@gmail.com">
            p.ellevernici@gmail.com
          </a>
          . È possibile proporre reclamo all&apos;Autorità Garante per la protezione dei dati personali (
          <a className="text-[#93c5fd] underline" href="https://www.garanteprivacy.it">
            www.garanteprivacy.it
          </a>
          ).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Modifiche</h2>
        <p className="mt-3 text-zinc-300">
          Il titolare si riserva di aggiornare la presente informativa in caso di variazioni normative
          o organizzative. Data ultimo aggiornamento: {new Date().toLocaleDateString("it-IT")}.
        </p>
        <p className="mt-4 text-xs text-zinc-500">
          Per un adempimento completo si raccomanda di allineare il testo ai trattamenti effettivamente
          svolti (es. CRM, newsletter, strumenti di analytics) e di farsi assistere da un professionista
          privacy. Per le tecnologie di tracciamento si veda anche la{" "}
          <Link href="/cookie-policy" className="text-[#93c5fd] underline">
            Cookie Policy
          </Link>
          .
        </p>
      </section>
    </div>
  );
}

export function CookiePolicyBody() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Premessa</h2>
        <p className="mt-3 text-zinc-300">
          Ai sensi dell&apos;art. 13 GDPR e del Provvedimento del Garante Privacy in materia di cookie
          (e successive linee guida applicabili), si forniscono le informazioni relative ai cookie e
          alle tecnologie similari utilizzate tramite questo sito.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Cosa sono i cookie</h2>
        <p className="mt-3 text-zinc-300">
          I cookie sono piccoli file di testo che il sito invia al terminale dell&apos;utente, dove vengono
          memorizzati per essere poi ritrasmessi alle visite successive. Oltre ai cookie possono
          essere usati strumenti affini (es. <em>local storage</em>) per finalità tecniche o di
          memorizzazione delle preferenze.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Cookie utilizzati</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[280px] text-left text-sm text-zinc-300">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-zinc-400">
              <tr>
                <th className="px-3 py-2">Tipologia / nome</th>
                <th className="px-3 py-2">Finalità</th>
                <th className="px-3 py-2">Durata indicativa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-3 py-3 font-medium text-white">Cookie tecnici di sessione</td>
                <td className="px-3 py-3">
                  Corretto funzionamento del sito, sicurezza, gestione preferenze strettamente
                  necessarie.
                </td>
                <td className="px-3 py-3">Sessione / breve</td>
              </tr>
              <tr>
                <td className="px-3 py-3 font-medium text-white">Memorizzazione consenso cookie</td>
                <td className="px-3 py-3">
                  Ricordare la scelta effettuata tramite il banner informativo (es. tramite{" "}
                  <em>local storage</em>).
                </td>
                <td className="px-3 py-3">12 mesi</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-zinc-400">
          Al momento non sono attivi cookie di profilazione o di analytics di terze parti. Qualora
          fossero introdotti in futuro, l&apos;informativa sarà aggiornata e, ove necessario, sarà
          richiesto il consenso tramite apposito strumento.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Base giuridica</h2>
        <p className="mt-3 text-zinc-300">
          I cookie tecnici strettamente necessari sono trattati in base al legittimo interesse del
          titolare e/o all&apos;esecuzione del servizio richiesto dall&apos;utente. Per eventuali cookie non
          necessari si richiederà il consenso (art. 6(1)(a) GDPR), revocabile in ogni momento.
        </p>
      </section>

      <section id="impostazioni-cookie" className="scroll-mt-28">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Impostazioni dei cookie</h2>
        <p className="mt-3 text-zinc-300">
          Puoi gestire o disabilitare i cookie attraverso le impostazioni del tuo browser. Di seguito
          alcuni link alle guide ufficiali dei principali browser (informazioni soggette a
          aggiornamenti da parte dei rispettivi fornitori):
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-300">
          <li>
            <a
              className="text-[#93c5fd] underline"
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              className="text-[#93c5fd] underline"
              href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              className="text-[#93c5fd] underline"
              href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apple Safari
            </a>
          </li>
          <li>
            <a
              className="text-[#93c5fd] underline"
              href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>
        <p className="mt-3 text-zinc-300">
          Per revocare il consenso memorizzato dal banner del sito puoi cancellare i dati di navigazione
          per questo dominio dalle impostazioni del browser oppure contattarci ai recapiti indicati
          nella{" "}
          <Link href="/privacy-policy" className="text-[#93c5fd] underline">
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Diritti privacy</h2>
        <p className="mt-3 text-zinc-300">
          Per l&apos;esercizio dei diritti in materia di dati personali si rinvia all&apos;informativa privacy
          del titolare.
        </p>
        <p className="mt-4 text-xs text-zinc-500">
          Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT")}.
        </p>
      </section>
    </div>
  );
}

export function CondizioniDiVenditaBody() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Ambito di applicazione</h2>
        <p className="mt-3 text-zinc-300">
          Le presenti condizioni disciplinano la vendita di prodotti e servizi connessi (es.
          miscelazione vernici, fornitura di autoricambi) da parte di P.ELLE VERNICI DI PINTO LAURA,
          salvo diverso accordo scritto tra le parti. Per i consumatori si applicano anche le
          disposizioni inderogabili del Codice del Consumo ove pertinenti.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Offerte e ordini</h2>
        <p className="mt-3 text-zinc-300">
          Preventivi e listini hanno valore indicativo salvo conferma scritta. L&apos;ordine si intende
          perfezionato con l&apos;accettazione da parte del venditore (anche per comportamento concludente,
          es. consegna merce). Salvo patto scritto, le condizioni generali del venditore prevalgono su
          eventuali condizioni d&apos;acquisto del cliente non espressamente approvate.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Prezzi e pagamenti</h2>
        <p className="mt-3 text-zinc-300">
          I prezzi sono quelli concordati o indicati in sede / documentazione commerciale al momento
          dell&apos;ordine, IVA e imposte incluse ove diversamente specificato. Le modalità di pagamento
          (contanti, bonifico, POS, dilazioni) sono quelle concordate per iscritto o secondo uso
          aziendale documentato.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Consegna e trasferimento del rischio</h2>
        <p className="mt-3 text-zinc-300">
          Salvo diverso accordo, la consegna avviene presso il punto vendita o secondo le modalità
          logistiche concordate. Il trasferimento del rischio segue le norme di legge e le clausole
          pattuite (es. Incoterms ove utilizzati).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Garanzie e difformità</h2>
        <p className="mt-3 text-zinc-300">
          La merce deve essere verificata al ricevimento. Eventuali difformità o vizi apparenti
          devono essere segnalati per iscritto nei termini di legge o, in mancanza, senza indebito
          ritardo. Per i consumatori si applicano le garanzie legali previste dal Codice del Consumo.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Limitazione di responsabilità</h2>
        <p className="mt-3 text-zinc-300">
          Salvo dolo o colpa grave e nei limiti consentiti dalla legge, la responsabilità del venditore
          è limitata al valore della fornitura. Resta inteso che indicazioni tecniche su vernici e
          colori non sostituiscono le verifiche obbligatorie in cabina di verniciatura secondo buona
          pratica professionale.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Foro competente e legge applicabile</h2>
        <p className="mt-3 text-zinc-300">
          Per le controversie è applicabile la legge italiana. Il foro competente è quello di
          Benevento, salvo foro inderogabile a favore del consumatore ove applicabile.
        </p>
        <p className="mt-4 text-xs text-zinc-500">
          Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT")}. Le condizioni sono un modello
          contrattuale: personalizzarle con il supporto legale prima dell&apos;adozione operativa.
        </p>
      </section>
    </div>
  );
}
