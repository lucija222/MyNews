import { createContext, useEffect } from "react";
import useMatchMedia from "../util/helpers/functions/useMatchMedia";

export const IsDesktopViewportContext = createContext(false);

const IsDesktopViewportProvider = ({ children }: any) => {
    const isDesktopViewport = useMatchMedia("(min-width: 794px)");

    useEffect(() => {
        console.log("IsDesktopVIewport", isDesktopViewport);
    }, [isDesktopViewport]);

    return (
        <IsDesktopViewportContext.Provider value={isDesktopViewport}>
            {children}
        </IsDesktopViewportContext.Provider>
    );
};

export default IsDesktopViewportProvider;
