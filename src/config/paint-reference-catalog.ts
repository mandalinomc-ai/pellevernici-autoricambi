/**
 * Specchietto ispirato ai ventagli professionali (Car Refinish): famiglie, scale di sfumatura
 * e formati codice tipici da listino. I codici sono esemplificativi: in sede si lavora sul sistema
 * tintometrico del marchio (chip, spettrofotometro, ricette 2K/UHS).
 */
export type PaintReferenceRow = {
  family: string;
  codeExamples: string;
  shadeNote: string;
  /** Colore principale da applicare al modello 3D (HEX indicativo). */
  hexApprox: string;
  /** Scala tipo “strip” del ventaglio: chiaro → scuro o variazioni metallizzato. */
  gradientHexes?: string[];
};

export const PAINT_REFERENCE_ROWS: PaintReferenceRow[] = [
  {
    family: "Argenti metallizzati (scala flake)",
    codeExamples: "Stile chip 88-1xx · 90-2xx",
    shadeNote: "Progressione argento chiaro → piombo micaceo, come strip Sprint / refinish",
    hexApprox: "#b0bec5",
    gradientHexes: ["#eceff1", "#cfd8dc", "#b0bec5", "#78909c", "#546e7a"],
  },
  {
    family: "Grigi monovolume / Nardo",
    codeExamples: "RAL 7016, 7021, 7037",
    shadeNote: "Scala grigi industriali e automotive, spesso in ventaglio dedicato",
    hexApprox: "#6d6d6d",
    gradientHexes: ["#9e9e9e", "#7e7e7e", "#6d6d6d", "#4a4a4a", "#37474f"],
  },
  {
    family: "Blu navy → blu elettrico",
    codeExamples: "Stile chip 61-0xx · 62-1xx",
    shadeNote: "Fascia blu profonda con metallizzato e flake più aperto sul chiaro",
    hexApprox: "#1a237e",
    gradientHexes: ["#283593", "#1a237e", "#0d47a1", "#1565c0", "#2962ff"],
  },
  {
    family: "Azzurri e ghiaccio (selezione chiari)",
    codeExamples: "RAL 5012, 5014, pastelli tintometrici",
    shadeNote: "Ventagli “colori chiari” tipo selezione pastelli / crema-azzurro",
    hexApprox: "#4fc3f7",
    gradientHexes: ["#e1f5fe", "#b3e5fc", "#81d4fa", "#4fc3f7", "#039be5"],
  },
  {
    family: "Rossi corsa e derivati",
    codeExamples: "RAL 3020, 3003, codici linea rossa OEM",
    shadeNote: "Da rosso acceso a bordeaux; pastello vs metallizzato in cabina",
    hexApprox: "#c62828",
    gradientHexes: ["#ff5252", "#e53935", "#c62828", "#b71c1c", "#880e4f"],
  },
  {
    family: "Arancio / rame racing",
    codeExamples: "RAL 2004, 2009, mica rame",
    shadeNote: "Arancio pieno e varianti metallizzate rame-bronzo",
    hexApprox: "#e65100",
    gradientHexes: ["#ffb74d", "#ff9800", "#e65100", "#d84315", "#bf360c"],
  },
  {
    family: "Gialli e oro metallizzato",
    codeExamples: "RAL 1023, 1036, gold flake",
    shadeNote: "Giallo pieno, giallo limone, oro con flake visibile",
    hexApprox: "#f9a825",
    gradientHexes: ["#fff9c4", "#ffee58", "#fbc02d", "#f9a825", "#c6a052"],
  },
  {
    family: "Verdi BRG / racing / menta",
    codeExamples: "RAL 6005, 6018, verdi OEM",
    shadeNote: "Verde scuro classico, medio saturo, menta moderna",
    hexApprox: "#1b5e20",
    gradientHexes: ["#c8e6c9", "#66bb6a", "#2e7d32", "#1b5e20", "#004d40"],
  },
  {
    family: "Viola / prugna / melanzana",
    codeExamples: "RAL 4007, 4005, perle viola",
    shadeNote: "Spesso in strip adiacenti ai blu sui ventagli completi",
    hexApprox: "#4a148c",
    gradientHexes: ["#e1bee7", "#9c27b0", "#6a1b9a", "#4a148c", "#311b92"],
  },
  {
    family: "Bianchi selezione (ghiaccio / magnesio)",
    codeExamples: "RAL 9010, 9016, 7035",
    shadeNote: "Strip bianchi e off-white come “Colors selezione” sui campioni",
    hexApprox: "#f5f5f5",
    gradientHexes: ["#ffffff", "#fafafa", "#eceff1", "#cfd8dc", "#b0bec5"],
  },
  {
    family: "Creme / champagne / beige",
    codeExamples: "RAL 1015, 1001, tinte perla chiara",
    shadeNote: "Sfumature calde per interni e carrozzerie chiare",
    hexApprox: "#d7ccc8",
    gradientHexes: ["#fff8e1", "#ffe0b2", "#d7ccc8", "#bcaaa4", "#8d6e63"],
  },
  {
    family: "Neri e grafiti",
    codeExamples: "RAL 9005, 7021, nero micaceo",
    shadeNote: "Nero assoluto vs nero metallizzato (flake sottile)",
    hexApprox: "#212121",
    gradientHexes: ["#616161", "#424242", "#303030", "#212121", "#0a0a0a"],
  },
  {
    family: "Metallizzato fine (flake piccolo)",
    codeExamples: "Base + binder, cod. mica MM*",
    shadeNote: "Aspetto “seta” tipico HS su lamiera curata",
    hexApprox: "#90a4ae",
  },
  {
    family: "Metallizzato grosso / Xirallic",
    codeExamples: "Flake grosso, linee premium",
    shadeNote: "Fortissimo effetto angolo-luce; match solo con chip reale",
    hexApprox: "#5c6bc0",
  },
  {
    family: "Perlato / tri-coat",
    codeExamples: "Base + perla + trasparente",
    shadeNote: "Come molti bianchi perla e colori premium sui ventagli Car Refinish",
    hexApprox: "#e1bee7",
  },
  {
    family: "Mica interference (flip-flop)",
    codeExamples: "Verde-blu, rame-verde",
    shadeNote: "Cambio colore con angolo: richiede campione fisico",
    hexApprox: "#00897b",
  },
  {
    family: "Pastello colore pieno (no flake)",
    codeExamples: "RAL 3020, 5002, 2004",
    shadeNote: "Copertura alta, colore “piatto” rispetto al metallizzato",
    hexApprox: "#1565c0",
  },
  {
    family: "Primer surfacer / filler",
    codeExamples: "HS grey, UHS primer",
    shadeNote: "Grigi guida prima del colore definitivo",
    hexApprox: "#bdbdbd",
  },
  {
    family: "Bicomponente colore 2K",
    codeExamples: "HS / MS + induritore",
    shadeNote: "Standard laboratorio carrozzeria",
    hexApprox: "#0d47a1",
  },
  {
    family: "Trasparente / clearcoat",
    codeExamples: "HS, UHS, anti-graffio",
    shadeNote: "Strato finale lucido; altera percezione profondità colore",
    hexApprox: "#eceff1",
  },
  {
    family: "Vernice plastica / paraurti",
    codeExamples: "Flex, adhesion promoter PP",
    shadeNote: "Elasticità su plastiche; codici dedicati sui listini ricambi",
    hexApprox: "#424242",
  },
];
