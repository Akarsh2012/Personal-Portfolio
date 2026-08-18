import React, { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Particle from "./Particle";
import Home from "./Home/Home";
import DeferredSection from "./DeferredSection";

/*
 * Single scrolling page composed from the existing page components.
 *
 * Each section renders exactly the markup it renders on its own route,
 * so nothing about their appearance changes. What is handled here
 * rather than inside them:
 *
 *   1. Particles. Every page mounts its own <Particle />, and that
 *      canvas is position:fixed with a hard-coded id. Stacked, this
 *      would put five identical full-viewport canvases on top of one
 *      another sharing a single DOM id. It is mounted once here, and
 *      each section is told to skip its own.
 *
 *   2. Weight. Pulling four more pages into the landing route would
 *      undo the route-level code splitting, so the sections stay lazy
 *      *and* deferred — they are neither downloaded nor rendered until
 *      the reader approaches them. Rendering all five up front cost
 *      roughly 600ms of extra blocking time.
 *
 *   3. Order. Sections run hero -> experience -> projects -> about ->
 *      contact, which matches how the three audiences read: proof in
 *      the first 30 seconds, ownership in the next minute, depth after
 *      that. About sits fourth because skills, badges and testimonials
 *      are weaker evidence than owned production work.
 *
 *   4. Anchors. Each wrapper keeps its id in the DOM even before its
 *      content mounts, so nav links always resolve.
 */
const About = lazy(() => import("./About/About"));
const Experience = lazy(() => import("./Experience/Experience"));
const Projects = lazy(() => import("./Projects/Projects"));
const Contact = lazy(() => import("./Contact/Contact"));

function OnePage() {
  const { hash } = useLocation();

  // A deep link such as /#projects must not land on a placeholder, so
  // any hash navigation renders every section straight away.
  const force = Boolean(hash);

  return (
    <>
      <Particle />

      <div id="home">
        <Home embedded />
      </div>

      <Suspense fallback={null}>
        <DeferredSection id="experience" minHeight={900} force={force}>
          <Experience embedded />
        </DeferredSection>

        <DeferredSection id="projects" minHeight={1200} force={force}>
          <Projects embedded />
        </DeferredSection>

        <DeferredSection id="about" minHeight={1000} force={force}>
          <About embedded />
        </DeferredSection>

        <DeferredSection id="contact" minHeight={600} force={force}>
          <Contact embedded />
        </DeferredSection>
      </Suspense>
    </>
  );
}

export default OnePage;
