import type { BodyStyleId } from "@/config/car-catalog";

/** Parametri per una sola mesh procedurale: variano per ogni `vehicleId`. */
export type SilhouetteParams = {
  bodyLenZ: number;
  bodyWidX: number;
  bodyHgtY: number;
  bodyY: number;
  skirtH: number;
  cabinLenZ: number;
  cabinWidX: number;
  cabinHgtY: number;
  cabinCenterZ: number;
  cabinCenterY: number;
  roofLenZ: number;
  roofHgtY: number;
  roofCenterZ: number;
  roofCenterY: number;
  bumperZ: number;
  bootLenZ: number;
  bootWidX: number;
  bootCenterY: number;
  wheelR: number;
  wheelDepth: number;
  wheelTrackX: number;
  wheelFrontZ: number;
  wheelRearZ: number;
  wheelY: number;
};

const STYLE_BASE: Record<BodyStyleId, SilhouetteParams> = {
  city: {
    bodyLenZ: 2.88,
    bodyWidX: 1.46,
    bodyHgtY: 0.5,
    bodyY: 0.44,
    skirtH: 0.1,
    cabinLenZ: 1.28,
    cabinWidX: 1.22,
    cabinHgtY: 0.52,
    cabinCenterZ: -0.04,
    cabinCenterY: 0.9,
    roofLenZ: 1.08,
    roofHgtY: 0.1,
    roofCenterZ: 0.02,
    roofCenterY: 1.18,
    bumperZ: 1.38,
    bootLenZ: 0,
    bootWidX: 0,
    bootCenterY: 0,
    wheelR: 0.31,
    wheelDepth: 0.19,
    wheelTrackX: 0.7,
    wheelFrontZ: 0.8,
    wheelRearZ: -0.8,
    wheelY: 0.31,
  },
  hatch: {
    bodyLenZ: 3.52,
    bodyWidX: 1.76,
    bodyHgtY: 0.44,
    bodyY: 0.46,
    skirtH: 0.11,
    cabinLenZ: 1.72,
    cabinWidX: 1.38,
    cabinHgtY: 0.48,
    cabinCenterZ: -0.16,
    cabinCenterY: 0.98,
    roofLenZ: 1.38,
    roofHgtY: 0.11,
    roofCenterZ: -0.08,
    roofCenterY: 1.24,
    bumperZ: 1.78,
    bootLenZ: 0,
    bootWidX: 0,
    bootCenterY: 0,
    wheelR: 0.34,
    wheelDepth: 0.2,
    wheelTrackX: 0.82,
    wheelFrontZ: 1.02,
    wheelRearZ: -1.02,
    wheelY: 0.34,
  },
  sedan: {
    bodyLenZ: 4.45,
    bodyWidX: 1.8,
    bodyHgtY: 0.46,
    bodyY: 0.48,
    skirtH: 0.12,
    cabinLenZ: 2.35,
    cabinWidX: 1.45,
    cabinHgtY: 0.5,
    cabinCenterZ: 0.05,
    cabinCenterY: 1.02,
    roofLenZ: 1.85,
    roofHgtY: 0.12,
    roofCenterZ: 0.08,
    roofCenterY: 1.3,
    bumperZ: 2.22,
    bootLenZ: 0,
    bootWidX: 0,
    bootCenterY: 0,
    wheelR: 0.34,
    wheelDepth: 0.2,
    wheelTrackX: 0.84,
    wheelFrontZ: 1.28,
    wheelRearZ: -1.28,
    wheelY: 0.34,
  },
  sport: {
    bodyLenZ: 4.55,
    bodyWidX: 1.72,
    bodyHgtY: 0.34,
    bodyY: 0.38,
    skirtH: 0.09,
    cabinLenZ: 1.55,
    cabinWidX: 1.18,
    cabinHgtY: 0.36,
    cabinCenterZ: -0.55,
    cabinCenterY: 0.78,
    roofLenZ: 1.18,
    roofHgtY: 0.1,
    roofCenterZ: -0.45,
    roofCenterY: 0.98,
    bumperZ: 2.28,
    bootLenZ: 0,
    bootWidX: 0,
    bootCenterY: 0,
    wheelR: 0.32,
    wheelDepth: 0.19,
    wheelTrackX: 0.8,
    wheelFrontZ: 1.35,
    wheelRearZ: -1.15,
    wheelY: 0.3,
  },
  suv: {
    bodyLenZ: 4.12,
    bodyWidX: 1.95,
    bodyHgtY: 0.62,
    bodyY: 0.55,
    skirtH: 0.13,
    cabinLenZ: 2.05,
    cabinWidX: 1.52,
    cabinHgtY: 0.52,
    cabinCenterZ: 0.02,
    cabinCenterY: 1.08,
    roofLenZ: 1.65,
    roofHgtY: 0.12,
    roofCenterZ: 0.05,
    roofCenterY: 1.36,
    bumperZ: 1.98,
    bootLenZ: 0,
    bootWidX: 0,
    bootCenterY: 0,
    wheelR: 0.37,
    wheelDepth: 0.21,
    wheelTrackX: 0.88,
    wheelFrontZ: 1.2,
    wheelRearZ: -1.15,
    wheelY: 0.38,
  },
  wagon: {
    bodyLenZ: 4.75,
    bodyWidX: 1.78,
    bodyHgtY: 0.46,
    bodyY: 0.48,
    skirtH: 0.12,
    cabinLenZ: 2.15,
    cabinWidX: 1.42,
    cabinHgtY: 0.48,
    cabinCenterZ: 0.12,
    cabinCenterY: 1.02,
    roofLenZ: 1.75,
    roofHgtY: 0.11,
    roofCenterZ: 0.15,
    roofCenterY: 1.28,
    bumperZ: 2.08,
    bootLenZ: 1.35,
    bootWidX: 1.5,
    bootCenterY: 0.88,
    wheelR: 0.34,
    wheelDepth: 0.2,
    wheelTrackX: 0.84,
    wheelFrontZ: 1.35,
    wheelRearZ: -1.35,
    wheelY: 0.34,
  },
};

function seed01(id: string, salt: number): number {
  let h = 2166136261 >>> 0;
  const s = `${id}:${salt}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10001) / 10000;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Silhouette diversa per ogni `vehicleId` (stesso schema, parametri unici), ancorata alla classe. */
export function getSilhouetteParamsForVehicle(vehicleId: string, bodyStyle: BodyStyleId): SilhouetteParams {
  const p: SilhouetteParams = { ...STYLE_BASE[bodyStyle] };
  const s = (i: number) => seed01(vehicleId, i);
  const m = (i: number, lo: number, hi: number) => lerp(lo, hi, s(i));

  p.bodyLenZ *= m(0, 0.92, 1.12);
  p.bodyWidX *= m(1, 0.9, 1.1);
  p.bodyHgtY *= m(2, 0.88, 1.12);
  p.bodyY *= m(3, 0.94, 1.08);

  p.cabinLenZ *= m(4, 0.88, 1.14);
  p.cabinWidX *= m(5, 0.9, 1.08);
  p.cabinHgtY *= m(6, 0.9, 1.1);
  p.cabinCenterZ += lerp(-0.2, 0.2, s(7));
  p.cabinCenterY *= m(8, 0.96, 1.06);

  p.roofLenZ *= m(9, 0.9, 1.12);
  p.roofCenterZ += lerp(-0.12, 0.12, s(10));
  p.roofCenterY *= m(11, 0.96, 1.05);

  p.wheelR *= m(12, 0.92, 1.1);
  p.wheelTrackX *= m(13, 0.94, 1.06);
  const half = (p.bodyLenZ * 0.5 - p.wheelR * 1.05) * m(14, 0.82, 0.98);
  p.wheelFrontZ = half;
  p.wheelRearZ = -half;
  p.wheelY *= m(15, 0.94, 1.06);

  if (bodyStyle === "wagon") {
    p.bootLenZ *= m(16, 0.92, 1.18);
    p.bootWidX = p.bodyWidX * m(17, 0.88, 0.96);
    p.bootCenterY *= m(18, 0.96, 1.04);
  } else {
    p.bootLenZ = 0;
    p.bootWidX = 0;
  }

  p.bumperZ = p.bodyLenZ * 0.5 - 0.12;
  return p;
}

export function getCameraForSilhouette(p: SilhouetteParams): {
  pos: [number, number, number];
  target: [number, number, number];
} {
  const span = Math.max(p.bodyLenZ, p.bodyWidX * 1.35, 3.2);
  const yLift = p.bodyY + p.bodyHgtY * 0.5;
  return {
    pos: [span * 1.12, span * 0.48 + yLift * 0.35, span * 1.18],
    target: [0, yLift * 0.85, 0],
  };
}
