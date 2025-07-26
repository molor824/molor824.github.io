import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

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
  const [textSize, setTextSize] = useState([0, 0]);
  const [nextTextSize, setNextTextSize] = useState([0, 0]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setScroll(true);
      setTimeout(() => {
        setScroll(false);
        setCurrentIndex(nextIndex);
      }, scrollDuration);
    }, switchInterval);
    return () => clearTimeout(timeout);
  }, [switchInterval, scrollDuration, nextIndex]);

  const textRef = useRef<HTMLDivElement>(null);
  const nextTextRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!textRef.current || !nextTextRef.current)
      throw new Error("Refs not set");

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === textRef.current) {
          setTextSize([entry.contentRect.width, entry.contentRect.height]);
        } else if (entry.target === nextTextRef.current) {
          setNextTextSize([entry.contentRect.width, entry.contentRect.height]);
        }
      }
    });
    observer.observe(textRef.current);
    observer.observe(nextTextRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={twMerge(
        "inline-block align-bottom relative overflow-hidden transition-all",
        className
      )}
      style={{
        width: `${scroll ? nextTextSize[0] : textSize[0]}px`,
        height: `${textSize[1]}px`,
        transitionDuration: `${scrollDuration}ms`,
      }}
    >
      <div
        className="absolute top-0 left-0 text-start transition-all"
        style={{
          transform: `translateY(${scroll ? -textSize[1] : 0}px)`,
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
