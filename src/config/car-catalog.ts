/**
 * Catalogo marca → modello per il configuratore 3D.
 * Ogni modello punta a una silhouette procedurale (classe di carrozzeria), non a un CAD ufficiale della casa.
 */
export type BodyStyleId = "city" | "hatch" | "sedan" | "sport" | "suv" | "wagon";

export type VehicleModel = {
  id: string;
  label: string;
  bodyStyle: BodyStyleId;
};

export type VehicleBrand = {
  id: string;
  label: string;
  models: VehicleModel[];
};

export const CONFIGURATOR_DISCLAIMER =
  "Non è un modello CAD ufficiale del costruttore: è un’anteprima 3D per tonalità e finitura.";

export const VEHICLE_BRANDS: VehicleBrand[] = [
  {
    id: "fiat",
    label: "Fiat",
    models: [
      { id: "fiat-500", label: "500", bodyStyle: "city" },
      { id: "fiat-panda", label: "Panda", bodyStyle: "hatch" },
      { id: "fiat-tipo", label: "Tipo (berlina)", bodyStyle: "sedan" },
      { id: "fiat-tipo-sw", label: "Tipo Station Wagon", bodyStyle: "wagon" },
      { id: "fiat-500x", label: "500X", bodyStyle: "suv" },
      { id: "fiat-124-spider", label: "124 Spider", bodyStyle: "sport" },
    ],
  },
  {
    id: "alfa",
    label: "Alfa Romeo",
    models: [
      { id: "alfa-mito", label: "MiTo", bodyStyle: "hatch" },
      { id: "alfa-giulietta", label: "Giulietta", bodyStyle: "hatch" },
      { id: "alfa-giulia", label: "Giulia", bodyStyle: "sedan" },
      { id: "alfa-stelvio", label: "Stelvio", bodyStyle: "suv" },
      { id: "alfa-tonale", label: "Tonale", bodyStyle: "suv" },
      { id: "alfa-4c", label: "4C", bodyStyle: "sport" },
    ],
  },
  {
    id: "renault",
    label: "Renault",
    models: [
      { id: "renault-twingo", label: "Twingo", bodyStyle: "city" },
      { id: "renault-clio", label: "Clio", bodyStyle: "hatch" },
      { id: "renault-megane", label: "Mégane", bodyStyle: "hatch" },
      { id: "renault-talisman", label: "Talisman", bodyStyle: "sedan" },
      { id: "renault-arkana", label: "Arkana", bodyStyle: "suv" },
      { id: "renault-austral", label: "Austral", bodyStyle: "suv" },
    ],
  },
  {
    id: "peugeot",
    label: "Peugeot",
    models: [
      { id: "peugeot-108", label: "108", bodyStyle: "city" },
      { id: "peugeot-208", label: "208", bodyStyle: "hatch" },
      { id: "peugeot-308", label: "308", bodyStyle: "hatch" },
      { id: "peugeot-508", label: "508", bodyStyle: "sedan" },
      { id: "peugeot-3008", label: "3008", bodyStyle: "suv" },
      { id: "peugeot-5008", label: "5008", bodyStyle: "suv" },
    ],
  },
  {
    id: "citroen",
    label: "Citroën",
    models: [
      { id: "citroen-c1", label: "C1", bodyStyle: "city" },
      { id: "citroen-c3", label: "C3", bodyStyle: "hatch" },
      { id: "citroen-c4", label: "C4", bodyStyle: "hatch" },
      { id: "citroen-c5x", label: "C5 X", bodyStyle: "wagon" },
      { id: "citroen-c5aircross", label: "C5 Aircross", bodyStyle: "suv" },
    ],
  },
  {
    id: "vw",
    label: "Volkswagen",
    models: [
      { id: "vw-up", label: "up!", bodyStyle: "city" },
      { id: "vw-polo", label: "Polo", bodyStyle: "hatch" },
      { id: "vw-golf", label: "Golf", bodyStyle: "hatch" },
      { id: "vw-passat", label: "Passat", bodyStyle: "sedan" },
      { id: "vw-arteon", label: "Arteon", bodyStyle: "sport" },
      { id: "vw-tiguan", label: "Tiguan", bodyStyle: "suv" },
    ],
  },
  {
    id: "bmw",
    label: "BMW",
    models: [
      { id: "bmw-1", label: "Serie 1", bodyStyle: "hatch" },
      { id: "bmw-3", label: "Serie 3", bodyStyle: "sedan" },
      { id: "bmw-5", label: "Serie 5", bodyStyle: "sedan" },
      { id: "bmw-4", label: "Serie 4 Coupé", bodyStyle: "sport" },
      { id: "bmw-x1", label: "X1", bodyStyle: "suv" },
      { id: "bmw-x3", label: "X3", bodyStyle: "suv" },
    ],
  },
  {
    id: "mercedes",
    label: "Mercedes-Benz",
    models: [
      { id: "mb-a", label: "Classe A", bodyStyle: "hatch" },
      { id: "mb-c", label: "Classe C", bodyStyle: "sedan" },
      { id: "mb-e", label: "Classe E", bodyStyle: "sedan" },
      { id: "mb-cla", label: "CLA", bodyStyle: "sport" },
      { id: "mb-gla", label: "GLA", bodyStyle: "suv" },
      { id: "mb-glc", label: "GLC", bodyStyle: "suv" },
    ],
  },
  {
    id: "audi",
    label: "Audi",
    models: [
      { id: "audi-a1", label: "A1", bodyStyle: "hatch" },
      { id: "audi-a3", label: "A3", bodyStyle: "hatch" },
      { id: "audi-a4", label: "A4", bodyStyle: "sedan" },
      { id: "audi-a5", label: "A5 Coupé", bodyStyle: "sport" },
      { id: "audi-q3", label: "Q3", bodyStyle: "suv" },
      { id: "audi-q5", label: "Q5", bodyStyle: "suv" },
    ],
  },
  {
    id: "ford",
    label: "Ford",
    models: [
      { id: "ford-ka", label: "Ka+", bodyStyle: "city" },
      { id: "ford-fiesta", label: "Fiesta", bodyStyle: "hatch" },
      { id: "ford-focus", label: "Focus", bodyStyle: "hatch" },
      { id: "ford-mondeo", label: "Mondeo", bodyStyle: "sedan" },
      { id: "ford-kuga", label: "Kuga", bodyStyle: "suv" },
      { id: "ford-puma", label: "Puma", bodyStyle: "suv" },
    ],
  },
  {
    id: "opel",
    label: "Opel",
    models: [
      { id: "opel-karl", label: "Karl / Corsa piccola", bodyStyle: "city" },
      { id: "opel-corsa", label: "Corsa", bodyStyle: "hatch" },
      { id: "opel-astra", label: "Astra", bodyStyle: "hatch" },
      { id: "opel-insignia", label: "Insignia", bodyStyle: "sedan" },
      { id: "opel-grandland", label: "Grandland", bodyStyle: "suv" },
    ],
  },
  {
    id: "toyota",
    label: "Toyota",
    models: [
      { id: "toyota-aygo", label: "Aygo X", bodyStyle: "city" },
      { id: "toyota-yaris", label: "Yaris", bodyStyle: "hatch" },
      { id: "toyota-corolla", label: "Corolla", bodyStyle: "hatch" },
      { id: "toyota-camry", label: "Camry", bodyStyle: "sedan" },
      { id: "toyota-c-hr", label: "C-HR", bodyStyle: "suv" },
      { id: "toyota-rav4", label: "RAV4", bodyStyle: "suv" },
    ],
  },
];

export function getBrandById(id: string): VehicleBrand | undefined {
  return VEHICLE_BRANDS.find((b) => b.id === id);
}

export function findVehicleModel(vehicleId: string): { brand: VehicleBrand; model: VehicleModel } | undefined {
  for (const brand of VEHICLE_BRANDS) {
    const model = brand.models.find((m) => m.id === vehicleId);
    if (model) return { brand, model };
  }
  return undefined;
}

export function getBodyStyleForVehicle(vehicleId: string): BodyStyleId {
  return findVehicleModel(vehicleId)?.model.bodyStyle ?? "hatch";
}

export const BODY_STYLE_LABEL_IT: Record<BodyStyleId, string> = {
  city: "City car",
  hatch: "Compatta / hatchback",
  sedan: "Berlina",
  sport: "Coupé / sport",
  suv: "SUV",
  wagon: "Station wagon",
};
