import React, { lazy, Suspense } from "react";

/*
 * Same background as before — the engine is just fetched after first
 * paint instead of blocking it. The fallback is deliberately null:
 * particles are decorative, so their brief absence is invisible,
 * whereas shipping the engine in the critical bundle is not.
 */
const ParticleField = lazy(() => import("./ParticleField"));

function Particle() {
  return (
    <Suspense fallback={null}>
      <ParticleField />
    </Suspense>
  );
}

export default Particle;
