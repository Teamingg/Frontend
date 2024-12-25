import { useEffect, useRef, useState } from "react";

const useObserver = ({ threshold = 0.5 }: { threshold?: number }) => {
  const observerElement = useRef<HTMLDivElement>(null);
  const [isView, setIsView] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsView(entry.isIntersecting);
        });
      },
      {
        threshold: threshold,
      }
    );
    if (observerElement.current) {
      observer.observe(observerElement.current);
    }

    return () => {
      if (observerElement.current) {
        observer.disconnect();
      }
    };
  }, []);

  return {
    ref: observerElement,
    isView,
  };
};

export default useObserver;
