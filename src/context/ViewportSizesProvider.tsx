import { createContext } from "react";
import useMatchMedia from "../util/helpers/functions/useMatchMedia";

export const IsSmallViewportContext = createContext(false);
export const IsMediumViewportContext = createContext(false);
export const IsLargeViewportContext = createContext(false);

const ViewportSizesProvider = ({ children }: any) => {
    const isSmallViewport = useMatchMedia("(max-width: 793px)");
    const isMediumViewport = useMatchMedia(
        "(min-width: 794px) and (max-width: 1199px)"
    );
    const isLargeViewport = useMatchMedia("(min-width: 1200px)");

    return (
        <IsSmallViewportContext.Provider value={isSmallViewport}>
            <IsMediumViewportContext.Provider value={isMediumViewport}>
                <IsLargeViewportContext.Provider value={isLargeViewport}>
                    {children}
                </IsLargeViewportContext.Provider>
            </IsMediumViewportContext.Provider>
        </IsSmallViewportContext.Provider>
    );
};

export default ViewportSizesProvider;
