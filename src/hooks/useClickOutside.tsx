// Ten folder to miejsce na hooki, czyli kawałki logiki wydzielone z komponentów tak zeby mozna bylo je
// uzywac w wielu roznych miejscach naraz, bez powtarzania kodu
// przykladowy - useClickOutside - hook ktory wykrywa czy ktos kliknął poza elementem

import { useEffect, RefObject } from "react";

type Handler = () => void;

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  toggleRef: RefObject<HTMLElement>,
  handler: Handler
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      const toggleEl = toggleRef?.current;
      if (
        !el ||
        el.contains((event?.target as Node) || null) ||
        toggleEl?.contains((event?.target as Node) || null)
      ) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, toggleRef, handler]);
}