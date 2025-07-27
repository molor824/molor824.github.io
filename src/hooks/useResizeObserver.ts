import { useEffect, useState, type RefObject } from "react";

function useResizeObserver<T extends Element>(ref: RefObject<T>) {
    const [size, setSize] = useState<DOMRectReadOnly | null>(null);
    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target !== ref.current) continue;
                setSize(entry.contentRect);
            }
        });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return size;
}

export default useResizeObserver;