import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Scrolls the window to the top whenever the route changes.
 *
 * - Ignores changes to the query string only (e.g. /jobs?search=…),
 *   so filtering a list doesn't jump the page.
 * - Leaves browser Back/Forward alone so the browser can restore
 *   the previous scroll position.
 * - Respects #hash links by scrolling to that element instead.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (navigationType === "POP") return;

    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash, navigationType]);

  return null;
};

export default ScrollToTop;
