import { useEffect, useState, type RefObject } from "react";

function useIntersectionObserver<T extends Element>(ref: RefObject<T>, options?: IntersectionObserverInit) {
    const [intersecting, setIntersecting] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.target !== ref.current) continue;
                setIntersecting(entry.isIntersecting);
            }
        }, options);
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [options]);
    return intersecting;
}
export default useIntersectionObserver;