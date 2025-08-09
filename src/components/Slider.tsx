import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PropsWithChildren,
} from "react";
import Arrow from "../assets/Arrow";
import { twMerge } from "tailwind-merge";
import useResizeObserver from "../hooks/useResizeObserver";

const SliderContext = createContext<{
  size: { width: number; height: number };
  addSlide(): { remove(): void };
}>(null!);
type Props = {
  slideDuration?: number;
  transitionInterval?: number;
  sliderGap?: number;
  className?: string;
  style?: CSSProperties;
};
function Slide({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const { addSlide, size } = useContext(SliderContext);
  const ref = useRef<ReturnType<typeof addSlide>>(null!);
  useEffect(() => {
    ref.current = addSlide();
    return () => ref.current.remove();
  }, []);
  return (
    <div
      className={className}
      style={{ width: size.width, height: size.height }}
    >
      {children}
    </div>
  );
}
function Slider({
  slideDuration = 500,
  transitionInterval = 3000,
  sliderGap = 16,
  className,
  children,
  style,
}: PropsWithChildren<Props>) {
  const [slideCount, setSlideCount] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null!);
  const size = useResizeObserver(ref) ?? { width: 0, height: 0 };
  const distance = size.width + sliderGap;

  useEffect(() => {
    if (slideCount === 0) return;
    const timeout = setTimeout(
      () => setSlideIndex((prev) => (prev + 1) % slideCount),
      transitionInterval
    );
    return () => clearTimeout(timeout);
  }, [slideCount, slideIndex, transitionInterval]);

  const addSlide = () => {
    let index = slideCount;
    setSlideCount((prev) => prev + 1);
    return {
      remove: () => {
        setSlideCount((prev) => {
          if (prev <= 0) return 0;
          if (index < slideIndex) setSlideIndex((prev) => prev - 1);
          return prev - 1;
        });
      },
    };
  };

  return (
    <div
      ref={ref}
      style={style}
      className={twMerge("overflow-hidden relative", className)}
    >
      <div
        className="absolute top-0 left-0 flex transition-all"
        style={{
          gap: sliderGap,
          transform: `translateX(${slideIndex * -distance}px)`,
          transitionDuration: `${slideDuration}ms`,
        }}
      >
        <SliderContext.Provider
          value={{
            addSlide,
            size: { width: size.width, height: size.height },
          }}
        >
          {children}
        </SliderContext.Provider>
      </div>
      <button
        onClick={() =>
          setSlideIndex((prev) => (prev - 1 + slideCount) % slideCount)
        }
        className="absolute top-[50%] left-8 p-2 bg-transparent hover:bg-white/10 rounded-xl"
      >
        <Arrow flip fill="#ffffff" width={20} height={20} strokeWidth={4} />
      </button>
      <button
        onClick={() => setSlideIndex((prev) => (prev + 1) % slideCount)}
        className="absolute top-[50%] right-8 p-2 bg-transparent hover:bg-white/10 rounded-xl"
      >
        <Arrow fill="#ffffff" width={20} height={20} strokeWidth={4} />
      </button>
      <div className="absolute bottom-[10px] left-[50%] translate-x-[-50%] flex gap-2">
        {Array.from({ length: slideCount }, (_, i) => (
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
export { Slide };
