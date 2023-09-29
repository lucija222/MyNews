import {
    createContext, Dispatch, ReactNode, SetStateAction,
    useState, useRef, useCallback,
} from "react";

interface IIsDataFetchedContext {
    isFetchCategoryData: boolean;
    isFetchWidgetData: boolean;
    setIsFetchCategoryData: Dispatch<SetStateAction<boolean>>;
    setIsFetchWidgetData: Dispatch<SetStateAction<boolean>>;
    debounceFetch: (
        fetchStateSetter: Dispatch<SetStateAction<boolean>>
    ) => void | (() => void);
}

export const IsFetchDataContext = createContext<IIsDataFetchedContext>({
    isFetchCategoryData: false,
    isFetchWidgetData: false,
    setIsFetchCategoryData: () => {},
    setIsFetchWidgetData: () => {},
    debounceFetch: () => {},
});

const IsFetchDataProvider = ({ children }: { children: ReactNode }) => {
    const [isFetchCategoryData, setIsFetchCategoryData] = useState(false);
    const [isFetchWidgetData, setIsFetchWidgetData] = useState(false);
    const timeoutIdRef = useRef<null | NodeJS.Timeout>(null);

    const debounceFetch = useCallback(
        (
            fetchStateSetter: Dispatch<SetStateAction<boolean>>,
        ) => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }

            timeoutIdRef.current = setTimeout(
                () => {
                    fetchStateSetter(true);
                }, 50);
        }, []);

    return (
        <IsFetchDataContext.Provider
            value={{
                isFetchCategoryData,
                isFetchWidgetData,
                setIsFetchCategoryData,
                setIsFetchWidgetData,
                debounceFetch,
            }}
        >
            {children}
        </IsFetchDataContext.Provider>
    );
};

export default IsFetchDataProvider;
