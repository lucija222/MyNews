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
    isCategoryLoading: true,
    isWidgetLoading: true,
});

export const SetIsLoadingContext = createContext<ISetIsLoadingContext>({
    setIsCategoryLoading: () => {},
    setIsWidgetLoading: () => {},
});

const IsLoadingProvider = ({ children }: { children: ReactNode }) => {
    const [isCategoryLoading, setIsCategoryLoading] = useState(true);
    const [isWidgetLoading, setIsWidgetLoading] = useState(true);

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
                    setIsWidgetLoading,
                }}
            >
                {children}
            </SetIsLoadingContext.Provider>
        </IsLoadingContext.Provider>
    );
};

export default IsLoadingProvider;