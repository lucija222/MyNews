import { PropsWithChildren, createContext, useState } from "react";

export const FeaturedOrLatestTogglerContext = createContext<{
    featuredOrLatestToggler: string;
    setFeaturedOrLatestToggler: (
        stringOrCallback: string | ((prevIndex: string) => string)
    ) => void;
}>({
    // featuredOrLatestToggler: "Featured",
    featuredOrLatestToggler: "none",
    setFeaturedOrLatestToggler: () => {},
});

const FeaturedOrLatestTogglerProvider = ({ children }: PropsWithChildren) => {
    const [featuredOrLatestToggler, setFeaturedOrLatestToggler] =
        useState("none");

    return (
        <FeaturedOrLatestTogglerContext.Provider
            value={{ featuredOrLatestToggler, setFeaturedOrLatestToggler }}>
            {children}
        </FeaturedOrLatestTogglerContext.Provider>
    );
};

export default FeaturedOrLatestTogglerProvider;
