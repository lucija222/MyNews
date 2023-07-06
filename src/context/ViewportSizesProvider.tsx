import { PropsWithChildren, createContext } from "react";
import useMatchMedia from "../util/helpers/functions/useMatchMedia";

export const IsSmallViewportContext = createContext(false);
export const isBigViewportContext = createContext(false);

const ViewportSizesProvider = ({ children }: PropsWithChildren) => {
    const isSmallViewport = useMatchMedia("(max-width: 793.9px)");
    const isBigViewport = useMatchMedia("(min-width: 794px)");

    return (
        <IsSmallViewportContext.Provider value={isSmallViewport}>
            <isBigViewportContext.Provider value={isBigViewport}>
                    {children}
            </isBigViewportContext.Provider>
        </IsSmallViewportContext.Provider>
    );
};

export default ViewportSizesProvider;
