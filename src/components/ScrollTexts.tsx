import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useDebounceCallback, useResizeObserver } from "usehooks-ts";

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

  const disableScroll = useDebounceCallback(() => {
    setScroll(false);
    setCurrentIndex(nextIndex);
  }, scrollDuration);
  const switchText = useDebounceCallback(() => {
    setScroll(true);
    disableScroll();
  }, switchInterval);

  useEffect(switchText, [currentIndex]);

  const textRef = useRef<HTMLDivElement>(null!);
  const nextTextRef = useRef<HTMLDivElement>(null!);
  const textSize = useResizeObserver({ ref: textRef });
  const nextTextSize = useResizeObserver({ ref: nextTextRef });

  return (
    <div
      className={twMerge(
        "inline-block align-bottom relative overflow-hidden transition-all",
        className
      )}
      style={{
        width: `${scroll ? nextTextSize.width ?? 0 : textSize.width ?? 0}px`,
        height: `${textSize.height ?? 0}px`,
        transitionDuration: `${scrollDuration}ms`,
      }}
    >
      <div
        className="absolute top-0 left-0 text-start transition-all"
        style={{
          transform: `translateY(${scroll ? -(textSize.height ?? 0) : 0}px)`,
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
