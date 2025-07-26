import { useEffect, useRef, useState, type JSX } from "react";
import { useResizeObserver } from "usehooks-ts";
import Arrow from "../assets/Arrow";

type Props = {
  slideDuration?: number;
  transitionInterval?: number;
  slides?: JSX.Element[];
  sliderGap?: number;
};
function Slider({
  slideDuration = 500,
  transitionInterval = 3000,
  sliderGap = 16,
  slides = [],
}: Props) {
  const [slideIndex, setSlideIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null!);
  const size = useResizeObserver({ ref });
  const distance = (size.width ?? 0) + sliderGap;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, transitionInterval);
    return () => clearTimeout(timeout);
  }, [slideIndex, transitionInterval]);

  return (
    <div ref={ref} className="overflow-hidden w-full h-full relative">
      <div
        className="absolute top-0 left-0 flex transition-all"
        style={{
          gap: sliderGap,
          transform: `translateX(${slideIndex * -distance}px)`,
          transitionDuration: `${slideDuration}ms`,
        }}
      >
        {slides.map((slide, i) => (
          <div
            style={{ width: size.width ?? 0, height: size.height ?? 0 }}
            key={i}
          >
            {slide}
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)
        }
        className="absolute top-[50%] left-8 p-2 bg-transparent hover:bg-white/20 rounded-xl"
      >
        <Arrow flip fill="#ffffff" width={20} height={20} strokeWidth={4} />
      </button>
      <button
        onClick={() => setSlideIndex((prev) => (prev + 1) % slides.length)}
        className="absolute top-[50%] right-8 p-2 bg-transparent hover:bg-white/20 rounded-xl"
      >
        <Arrow fill="#ffffff" width={20} height={20} strokeWidth={4} />
      </button>
      <div className="absolute bottom-[10px] left-[50%] flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setSlideIndex(i)}
            className="w-[10px] aspect-square rounded-full transition-colors"
            style={{
              transitionDuration: `${slideDuration}ms`,
              backgroundColor: i === slideIndex ? "#ffffff" : "#ffffff50",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
