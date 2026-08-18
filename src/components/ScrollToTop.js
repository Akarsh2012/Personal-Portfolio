import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* Height of the fixed navbar, so an anchored heading is not hidden. */
const NAV_OFFSET = 70;

/* Re-check the landing position on this schedule (ms). Sections mount
   lazily and images load late, so the target keeps moving for a second
   or two after the first scroll. */
const CORRECTIONS = [120, 320, 650, 1100, 1700, 2500];

/*
 * Scroll behaviour for the single-page layout.
 *
 * Without a hash, jump to the top as before.
 *
 * With one, scroll straight away and then converge. An earlier version
 * waited for the target's offset to stop changing before scrolling at
 * all, which never fired on a cold load — images kept shifting layout
 * for longer than the wait, so a deep link simply stayed at the top.
 * Landing roughly and correcting is far more reliable than trying to
 * measure once, perfectly.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = hash.slice(1);
    const timers = [];
    let cancelled = false;

    const targetTop = (el) =>
      Math.max(0, el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET);

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const go = (behavior) => {
      const el = document.getElementById(id);
      if (!el) return false;
      window.scrollTo({ top: targetTop(el), behavior });
      return true;
    };

    const correct = () => {
      if (cancelled) return;
      const node = document.getElementById(id);
      if (!node) return;
      const drift = node.getBoundingClientRect().top - NAV_OFFSET;
      if (Math.abs(drift) > 16) go("auto");
    };

    // First attempt, retried until the section exists (it is lazily
    // loaded, so it may be a few frames away on a cold load).
    const attempt = (tries = 0) => {
      if (cancelled) return;

      const el = document.getElementById(id);
      if (!el) {
        if (tries < 60) timers.push(setTimeout(() => attempt(tries + 1), 50));
        return;
      }

      // Long jumps land instantly; animating tens of thousands of
      // pixels looks broken and can be interrupted mid-flight.
      const distance = Math.abs(targetTop(el) - window.scrollY);
      go(distance > 2500 || reduced ? "auto" : "smooth");

      // Converge as late content settles.
      CORRECTIONS.forEach((delay) => {
        timers.push(setTimeout(() => correct(), delay));
      });
    };

    attempt();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
