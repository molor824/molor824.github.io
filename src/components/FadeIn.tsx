import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

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
  const ref = useRef<HTMLDivElement>(null!);
  const isIntersecting = useIntersectionObserver(ref);
  
  useEffect(() => {
    if (isIntersecting) {
      setTimeout(() => setFadeIn(true), fadeDelay);
    }
  }, [isIntersecting, fadeDelay]);

  return (
    <div
      ref={ref}
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
