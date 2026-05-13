"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import type { BodyStyleId } from "@/config/car-catalog";
import { getCameraForSilhouette, getSilhouetteParamsForVehicle } from "@/config/vehicle-shape";
import { ConfigurableSilhouetteCar } from "./ConfigurableSilhouetteCar";

/** Unico veicolo generico per anteprima colore (silhouette fissa). */
const PREVIEW_VEHICLE_ID = "anteprima-colore-generica";
const PREVIEW_BODY_STYLE: BodyStyleId = "hatch";

function Scene({ hex }: { hex: string }) {
  const shape = useMemo(
    () => getSilhouetteParamsForVehicle(PREVIEW_VEHICLE_ID, PREVIEW_BODY_STYLE),
    [],
  );
  const cam = useMemo(() => getCameraForSilhouette(shape), [shape]);

  return (
    <>
      <color attach="background" args={["#0d1117"]} />
      <PerspectiveCamera makeDefault position={cam.pos} fov={40} near={0.1} far={80} />
      <ambientLight intensity={0.28} />
      <directionalLight castShadow position={[6, 10, 4]} intensity={1.15} shadow-mapSize={[2048, 2048]} />
      <spotLight position={[-6, 8, -2]} angle={0.45} penumbra={0.9} intensity={0.55} color="#b8cfff" />
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      <ConfigurableSilhouetteCar color={hex} shape={shape} />
      <ContactShadows position={[0, 0, 0]} opacity={0.55} scale={18} blur={2.4} far={10} color="#000000" />
      <OrbitControls
        enablePan={false}
        minDistance={3.2}
        maxDistance={16}
        minPolarAngle={0.28}
        maxPolarAngle={1.48}
        target={cam.target}
      />
    </>
  );
}

export default function CarConfiguratorCanvas({ hex }: { hex: string }) {
  return (
    <div className="relative h-full min-h-[280px] w-full">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        className="h-full w-full"
      >
        <Scene hex={hex} />
      </Canvas>
    </div>
  );
}
