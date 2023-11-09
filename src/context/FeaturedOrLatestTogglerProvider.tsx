import { Dispatch, SetStateAction, ReactNode, createContext, useState } from "react";

interface IFeaturedOrLatestStateContext {
    featuredOrLatestState: string;
    setFeaturedOrLatestState: Dispatch<SetStateAction<string>>;
}

export const FeaturedOrLatestStateContext =
    createContext<IFeaturedOrLatestStateContext>({
        featuredOrLatestState: "none",
        setFeaturedOrLatestState: () => {},
    });

const FeaturedOrLatestStateProvider = ({ children }: { children: ReactNode }) => {
    const [featuredOrLatestState, setFeaturedOrLatestState] = useState("none");

    return (
        <FeaturedOrLatestStateContext.Provider
            value={{
                featuredOrLatestState,
                setFeaturedOrLatestState,
            }}
        >
            {children}
        </FeaturedOrLatestStateContext.Provider>
    );
};

export default FeaturedOrLatestStateProvider;
