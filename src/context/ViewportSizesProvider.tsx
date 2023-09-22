import { MutableRefObject, ReactNode, createContext, useEffect, useRef } from "react";
import useMatchMedia from "../util/helpers/customHooks/useMatchMedia";

export const ViewportSizesContext = createContext({
    isSmallViewport: false,
    isMidViewport: false,
    isBigViewport: false
});

const ViewportSizesProvider = ({ children }: {children: ReactNode}) => {
    const isSmallViewport = useMatchMedia("(max-width: 721.9px)");
    const isMidViewport = useMatchMedia(
        "(min-width: 722px) and (max-width: 1029.9px)"
    );
    const isBigViewport = useMatchMedia("(min-width: 1030px)");

    const prevIsSmallViewport = useRef(isSmallViewport);
    const prevIsMidViewport = useRef(isMidViewport);
    const prevIsBigViewport = useRef(isBigViewport);

    const scrollToTopOnViewportChange = (prevViewport: MutableRefObject<boolean>, currentViewport: boolean) => {
        if (!prevViewport.current && currentViewport) {
            window.scrollTo(0, 0);
        }

        prevViewport.current = currentViewport;
    };

    const isViewportChecked = isSmallViewport || isMidViewport || isBigViewport;

    useEffect(() => {
        scrollToTopOnViewportChange(prevIsSmallViewport, isSmallViewport);
        scrollToTopOnViewportChange(prevIsMidViewport, isMidViewport);
        scrollToTopOnViewportChange(prevIsBigViewport, isBigViewport);
    }, [isSmallViewport, isMidViewport, isBigViewport]);

    return (
        <ViewportSizesContext.Provider
            value={{ isSmallViewport, isMidViewport, isBigViewport }}
        >
            {isViewportChecked && children}
        </ViewportSizesContext.Provider>
    );
};

export default ViewportSizesProvider;