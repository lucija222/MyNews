import {
    createContext, Dispatch, ReactNode, SetStateAction, useState,
} from "react";

interface IIsDataFetchedContext {
    isFetchCategoryData: boolean;
    isFetchWidgetData: boolean;
    setIsFetchCategoryData: Dispatch<SetStateAction<boolean>>;
    setIsFetchWidgetData: Dispatch<SetStateAction<boolean>>;
}

export const IsFetchDataContext = createContext<IIsDataFetchedContext>({
    isFetchCategoryData: false,
    isFetchWidgetData: false,
    setIsFetchCategoryData: () => {},
    setIsFetchWidgetData: () => {},
});

const IsFetchDataProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [isFetchCategoryData, setIsFetchCategoryData] = useState(false);
    const [isFetchWidgetData, setIsFetchWidgetData] = useState(false);

    return (
        <IsFetchDataContext.Provider
            value={{
                isFetchCategoryData,
                isFetchWidgetData,
                setIsFetchCategoryData,
                setIsFetchWidgetData,
            }}
        >
            {children}
        </IsFetchDataContext.Provider>
    );
};

export default IsFetchDataProvider;
