"use client";

import { useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { SilhouetteParams } from "@/config/vehicle-shape";

function WheelDyn({
  position,
  r,
  depth,
  rotationY = 0,
}: {
  position: [number, number, number];
  r: number;
  depth: number;
  rotationY?: number;
}) {
  const rimR = r * 0.58;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[r, r, depth, 26]} />
        <meshStandardMaterial color="#121418" roughness={0.94} metalness={0.06} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[rimR, rimR, depth + 0.03, 20]} />
        <meshStandardMaterial color="#aeb6bf" metalness={0.88} roughness={0.26} />
      </mesh>
    </group>
  );
}

function usePaintColor(hex: string) {
  return useMemo(() => {
    const c = new THREE.Color();
    c.set(hex);
    return c;
  }, [hex]);
}

type Props = {
  color: string;
  shape: SilhouetteParams;
};

export function ConfigurableSilhouetteCar({ color, shape }: Props) {
  const c = usePaintColor(color);
  const rRad = Math.min(0.12, shape.bodyWidX * 0.055);
  const glass = (
    <meshPhysicalMaterial
      color="#d6e9ff"
      transmission={0.94}
      thickness={0.55}
      roughness={0.04}
      metalness={0}
      ior={1.46}
      transparent
      opacity={1}
    />
  );
  const paint = (metalness: number, rough: number, coatR: number) => (
    <meshPhysicalMaterial
      color={c}
      metalness={metalness}
      roughness={rough}
      clearcoat={1}
      clearcoatRoughness={coatR}
      envMapIntensity={1.08}
    />
  );

  return (
    <group dispose={null}>
      <RoundedBox
        args={[shape.bodyWidX, shape.bodyHgtY, shape.bodyLenZ]}
        radius={rRad}
        smoothness={4}
        position={[0, shape.bodyY, 0]}
        castShadow
        receiveShadow
      >
        {paint(0.56, 0.26, 0.08)}
      </RoundedBox>
      <RoundedBox
        args={[shape.bodyWidX + 0.02, shape.skirtH, shape.bodyLenZ + 0.03]}
        radius={rRad * 0.45}
        position={[0, shape.bodyY - shape.bodyHgtY * 0.5 - shape.skirtH * 0.5, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#0b0e14" roughness={0.72} metalness={0.25} />
      </RoundedBox>
      <RoundedBox
        args={[shape.cabinWidX, shape.cabinHgtY, shape.cabinLenZ]}
        radius={rRad * 0.75}
        smoothness={4}
        position={[0, shape.cabinCenterY, shape.cabinCenterZ]}
        castShadow
      >
        {glass}
      </RoundedBox>
      <RoundedBox
        args={[shape.cabinWidX + 0.02, shape.roofHgtY, shape.roofLenZ]}
        radius={rRad * 0.55}
        position={[0, shape.roofCenterY, shape.roofCenterZ]}
        castShadow
        receiveShadow
      >
        {paint(0.52, 0.3, 0.09)}
      </RoundedBox>
      {shape.bootLenZ > 0.05 ? (
        <RoundedBox
          args={[shape.bootWidX, shape.bodyHgtY * 0.88, shape.bootLenZ]}
          radius={rRad * 0.7}
          position={[0, shape.bootCenterY, -shape.bodyLenZ * 0.5 - shape.bootLenZ * 0.5 + 0.06]}
          castShadow
          receiveShadow
        >
          {paint(0.54, 0.27, 0.085)}
        </RoundedBox>
      ) : null}
      <mesh position={[0, shape.bodyY + 0.04, shape.bumperZ]} castShadow>
        <boxGeometry args={[shape.bodyWidX * 0.88, shape.bodyHgtY * 0.48, 0.26]} />
        <meshStandardMaterial color="#0f1218" roughness={0.55} metalness={0.35} />
      </mesh>
      <mesh position={[shape.bodyWidX * 0.22, shape.bodyY + 0.06, shape.bumperZ]} castShadow>
        <sphereGeometry args={[0.065, 14, 14]} />
        <meshStandardMaterial
          color="#f2f4f8"
          emissive="#fff8e6"
          emissiveIntensity={0.32}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[-shape.bodyWidX * 0.22, shape.bodyY + 0.06, shape.bumperZ]} castShadow>
        <sphereGeometry args={[0.065, 14, 14]} />
        <meshStandardMaterial
          color="#f2f4f8"
          emissive="#fff8e6"
          emissiveIntensity={0.32}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      <WheelDyn
        position={[shape.wheelTrackX, shape.wheelY, shape.wheelFrontZ]}
        r={shape.wheelR}
        depth={shape.wheelDepth}
      />
      <WheelDyn
        position={[-shape.wheelTrackX, shape.wheelY, shape.wheelFrontZ]}
        r={shape.wheelR}
        depth={shape.wheelDepth}
      />
      <WheelDyn
        position={[shape.wheelTrackX, shape.wheelY, shape.wheelRearZ]}
        r={shape.wheelR}
        depth={shape.wheelDepth}
      />
      <WheelDyn
        position={[-shape.wheelTrackX, shape.wheelY, shape.wheelRearZ]}
        r={shape.wheelR}
        depth={shape.wheelDepth}
      />
    </group>
  );
}
