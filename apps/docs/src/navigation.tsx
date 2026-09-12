import { useEffect, useState, type ComponentProps } from "react";

export function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);
  useEffect(() => {
    const update = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);
  useEffect(() => {
    if (window.location.hash) {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    document
      .querySelector<HTMLElement>("main h1")
      ?.focus({ preventScroll: true });
  }, [pathname]);
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
