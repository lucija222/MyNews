import {
    Dispatch, SetStateAction, createContext, useState, ReactNode, 
} from "react";

interface IIsLoadingContext {
    isCategoryLoading: boolean;
    isWidgetLoading: boolean;
}
interface ISetIsLoadingContext {
    setIsCategoryLoading: Dispatch<SetStateAction<boolean>>;
    setIsWidgetLoading: Dispatch<SetStateAction<boolean>>;
}

export const IsLoadingContext = createContext<IIsLoadingContext>({
    isCategoryLoading: false,
    isWidgetLoading: false,
});

export const SetIsLoadingContext = createContext<ISetIsLoadingContext>({
    setIsCategoryLoading: () => {},
    setIsWidgetLoading: () => {},
});

const IsLoadingProvider = ({ children }: { children: ReactNode }) => {
    const [isCategoryLoading, setIsCategoryLoading] = useState(false);
    const [isWidgetLoading, setIsWidgetLoading] = useState(false);

    return (
        <IsLoadingContext.Provider
            value={{
                isCategoryLoading,
                isWidgetLoading,
            }}
        >
            <SetIsLoadingContext.Provider
                value={{
                    setIsCategoryLoading,
                    setIsWidgetLoading
                }}
            >
                {children}
            </SetIsLoadingContext.Provider>
        </IsLoadingContext.Provider>
    );
};

export default IsLoadingProvider;