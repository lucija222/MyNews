import { Dispatch, SetStateAction, ReactNode, createContext, useState } from "react";

interface IFeaturedOrLatestStateContext {
    featuredOrLatestState: string;
    setFeaturedOrLatestToggler: Dispatch<SetStateAction<string>>;
}

export const FeaturedOrLatestStateContext =
    createContext<IFeaturedOrLatestStateContext>({
        featuredOrLatestState: "none",
        setFeaturedOrLatestToggler: () => {},
    });

const FeaturedOrLatestStateProvider = ({ children }: { children: ReactNode }) => {
    const [featuredOrLatestState, setFeaturedOrLatestState] = useState("none");

    return (
        <FeaturedOrLatestStateContext.Provider
            value={{
                featuredOrLatestState: featuredOrLatestState,
                setFeaturedOrLatestToggler: setFeaturedOrLatestState,
            }}
        >
            {children}
        </FeaturedOrLatestStateContext.Provider>
    );
};

export default FeaturedOrLatestStateProvider;
