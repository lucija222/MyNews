import { createContext, useState } from "react";

export const FeaturedOrLatestTogglerContext = createContext({
    featuredOrLatestToggler: "Featured", 
    setFeaturedOrLatestToggler: (featuredOrLatest: string) => {}
});

const FeaturedOrLatestTogglerProvider = ({children}: any) => {
    const [featuredOrLatestToggler, setFeaturedOrLatestToggler] =
        useState("Featured");

    return (
        <FeaturedOrLatestTogglerContext.Provider value={{featuredOrLatestToggler, setFeaturedOrLatestToggler}}>
            {children}
        </FeaturedOrLatestTogglerContext.Provider>
    );
};

export default FeaturedOrLatestTogglerProvider;