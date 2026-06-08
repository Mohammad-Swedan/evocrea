"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AnimatePresence } from "framer-motion";
import NexoraLoader from "./NexoraLoader";

const LoaderContext = createContext({ done: false });
export const useLoader = () => useContext(LoaderContext);

export default function LoaderProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  const [done, setDone] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const seen = sessionStorage.getItem("evocrea-loaded");

    if (!seen && !prefersReduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldShow(true);
      sessionStorage.setItem("evocrea-loaded", "1");
    } else {
      setDone(true);
    }
  }, []);

  const handleComplete = () => {
    setDone(true);
    setShouldShow(false);
  };

  return (
    <LoaderContext.Provider value={{ done }}>
      <AnimatePresence mode="wait">
        {shouldShow && (
          <NexoraLoader
            key="loader"
            locale={locale}
            onComplete={handleComplete}
          />
        )}
      </AnimatePresence>
      <div
        style={{
          opacity: done ? 1 : 0,
          transition: "opacity 0.5s ease 0.2s",
        }}
      >
        {children}
      </div>
    </LoaderContext.Provider>
  );
}
