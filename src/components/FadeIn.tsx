import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  fadeDuration?: number;
  fadeDelay?: number;
  distance?: number;
  className?: string;
};
function FadeIn({
  children,
  fadeDuration = 500,
  fadeDelay = 0,
  distance = 20,
  className,
}: PropsWithChildren<Props>) {
  let [fadeIn, setFadeIn] = useState(false);
  let divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setFadeIn(true);
          }, fadeDelay);
          observer.unobserve(entry.target);
        }
      }
    });
    observer.observe(divRef.current);
    return () => observer.disconnect();
  }, [fadeDelay]);

  return (
    <div
      ref={divRef}
      className={twMerge("transition-all ease-out", className)}
      style={{
        transitionDuration: `${fadeDuration}ms`,
        opacity: fadeIn ? 1 : 0,
        transform: fadeIn ? "translateY(0)" : `translateY(${distance}px)`,
      }}
    >
      {children}
    </div>
  );
}

export default FadeIn;
