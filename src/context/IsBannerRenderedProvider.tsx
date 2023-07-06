import { PropsWithChildren, createContext, useState } from "react";

export const IsBannerRenderedContext = createContext<{
    isBannerRendered: boolean;
    setIsBannerRendered: (
        booleanOrCallback: boolean | ((prevIndex: boolean) => boolean)
    ) => void;
}>({ isBannerRendered: true, setIsBannerRendered: () => {} });

const IsBannerRenderedProvider = ({ children }: PropsWithChildren) => {
    const [isBannerRendered, setIsBannerRendered] = useState(true);

    return (
        <IsBannerRenderedContext.Provider
            value={{ isBannerRendered, setIsBannerRendered }}
        >
            {children}
        </IsBannerRenderedContext.Provider>
    );
};

export default IsBannerRenderedProvider;
