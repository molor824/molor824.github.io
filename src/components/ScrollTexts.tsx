import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import useResizeObserver from "../hooks/useResizeObserver";

type Props = {
  className?: string;
  texts?: string[];
  switchInterval?: number;
  scrollDuration?: number;
};

function ScrollTexts({
  className,
  texts = [],
  switchInterval = 3000,
  scrollDuration = 500,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextIndex = (currentIndex + 1) % texts.length;
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setScroll(true);
      setTimeout(() => {
        setScroll(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length)
      }, scrollDuration);
    }, switchInterval);
    return () => clearInterval(interval);
  }, [switchInterval, scrollDuration, texts.length]);

  const textRef = useRef<HTMLDivElement>(null!);
  const nextTextRef = useRef<HTMLDivElement>(null!);
  const textSize = useResizeObserver(textRef) ?? { width: 0, height: 0 };
  const nextTextSize = useResizeObserver(nextTextRef) ?? { width: 0, height: 0 };

  return (
    <div
      className={twMerge(
        "inline-block align-bottom relative overflow-hidden transition-all",
        className
      )}
      style={{
        width: `${scroll ? nextTextSize.width : textSize.width}px`,
        height: `${textSize.height}px`,
        transitionDuration: `${scrollDuration}ms`,
      }}
    >
      <div
        className="absolute top-0 left-0 text-start transition-all"
        style={{
          transform: `translateY(${scroll ? -textSize.height : 0}px)`,
          transitionDuration: `${scroll ? scrollDuration : 0}ms`,
        }}
      >
        <div className="w-max" ref={textRef}>
          {texts[currentIndex]}
        </div>
        <div className="w-max" ref={nextTextRef}>
          {texts[nextIndex]}
        </div>
      </div>
    </div>
  );
}
export default ScrollTexts;
