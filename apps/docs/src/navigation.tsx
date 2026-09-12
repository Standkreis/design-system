import { useEffect, useState, type ComponentProps } from "react";

export function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const update = () => {
      setPathname(window.location.pathname);
      setHash(window.location.hash);
    };
    window.addEventListener("popstate", update);
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener("hashchange", update);
    };
  }, []);
  useEffect(() => {
    const target = window.location.hash
      ? document.getElementById(window.location.hash.slice(1))
      : null;
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: "instant" });
    const heading =
      target?.querySelector<HTMLElement>("h1, h2") ??
      document.querySelector<HTMLElement>("main h1");
    if (heading) {
      heading.tabIndex = -1;
      // Native fragment navigation clears focus; apply it after that step.
      const frame = requestAnimationFrame(() =>
        heading.focus({ preventScroll: true }),
      );
      return () => cancelAnimationFrame(frame);
    }
  }, [pathname, hash]);
  return pathname.replace(/\/$/, "") || "/";
}

/** Ordinary links retain open-in-new-tab behaviour and direct URLs. */
export function DocLink({
  href = "/brand",
  onClick,
  ...props
}: ComponentProps<"a">) {
  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          props.target ||
          props.download
        )
          return;
        const url = new URL(href, window.location.href);
        if (
          url.origin !== window.location.origin ||
          url.pathname === window.location.pathname
        )
          return;
        event.preventDefault();
        window.history.pushState(null, "", url);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }}
    />
  );
}
