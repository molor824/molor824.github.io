import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { useDebounceCallback, useIntersectionObserver } from "usehooks-ts";

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
  const fadeInDebounced = useDebounceCallback(() => setFadeIn(true), fadeDelay);
  const { ref, isIntersecting } = useIntersectionObserver();

  if (isIntersecting) fadeInDebounced();

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
