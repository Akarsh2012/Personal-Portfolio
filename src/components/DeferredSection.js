import React, { useEffect, useRef, useState } from "react";

/*
 * Mounts its children only once the section is close to the viewport.
 *
 * Stacking five pages onto one route meant React rendered all of them
 * during the initial commit, which pushed total blocking time from
 * ~280ms to ~880ms. Deferring the sections that nobody has scrolled to
 * yet keeps the single-page experience while giving the main thread
 * back to the hero.
 *
 * Two details that matter:
 *   - The wrapper div and its id are always in the DOM, so anchor links
 *     resolve and the nav works even before a section has mounted.
 *   - `force` short-circuits the observer. OnePage sets it when the URL
 *     carries a hash, so a deep link to #contact renders immediately
 *     instead of scrolling to a collapsed placeholder.
 */
function DeferredSection({ id, minHeight = 600, force = false, children }) {
  const [shown, setShown] = useState(force);
  const ref = useRef(null);

  useEffect(() => {
    if (force) {
      setShown(true);
      return;
    }
  }, [force]);

  useEffect(() => {
    if (shown) return;

    const node = ref.current;
    if (!node) return;

    // No IntersectionObserver (or reduced-motion users on old browsers)
    // — just render rather than leaving the page empty.
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      // Mount well before the section is visible so the reader never
      // catches it appearing.
      { rootMargin: "1200px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <div
      id={id}
      ref={ref}
      className="onepage-anchor"
      style={shown ? undefined : { minHeight }}
    >
      {shown ? children : null}
    </div>
  );
}

export default DeferredSection;
