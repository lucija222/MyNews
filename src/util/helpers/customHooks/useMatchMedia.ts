import { useState, useRef, useEffect } from "react";

const useMatchMedia = (mediaQuery: string): boolean => {
    const [isMatching, setIsMatching] = useState(false);
    const isFirstRender = useRef(true);

    const handleMatchMediaChange = (e: MediaQueryListEvent) => {
            setIsMatching(e.matches);
    };

    useEffect(() => {
        const matchQueryList = window.matchMedia(mediaQuery);
        matchQueryList.addEventListener("change", handleMatchMediaChange);

        if (isFirstRender.current) {
            setIsMatching(matchQueryList.matches);
            isFirstRender.current = false;
        };

        return () => {
            matchQueryList.removeEventListener(
                "change",
                handleMatchMediaChange
            );
        };
    }, [mediaQuery, isMatching]);

    return isMatching;
};

export default useMatchMedia;