import { nytAPI_Key } from "../../util/helpers/constants";
import {  ReactNode, createContext, useCallback, useContext, useEffect, useState, } from "react";
import { SetIsLoadingContext } from "../IsLoadingProvider";

interface IWidgetUrlContext {
    API_Widget_URL: string;
    isMaxWidgetFetchCalls: boolean;
    changeWidgetURLparams: () => void;
    resetWidgetURLparams: () => void;
}

export const WidgetUrlContext = createContext<IWidgetUrlContext>({
    API_Widget_URL: `https://api.nytimes.com/svc/news/v3/content/all/all.json?limit=100&offset=0&api-key=${nytAPI_Key}`,
    isMaxWidgetFetchCalls: false,
    changeWidgetURLparams: () => {},
    resetWidgetURLparams: () => {},
});

const WidgetUrlProvider = ({ children }: { children: ReactNode }) => {
    const [widgetURL_Offset, setWidgetURL_Offset] = useState(0);
    const [API_Widget_URL, setAPI_Widget_URL] = useState(
        `https://api.nytimes.com/svc/news/v3/content/all/all.json?limit=100&offset=${widgetURL_Offset}&api-key=${nytAPI_Key}`
    );
    const { setIsWidgetLoading } = useContext(SetIsLoadingContext); 

    const isMaxWidgetFetchCalls = widgetURL_Offset === 400;

    const resetWidgetURLparams = useCallback(() => {
        setWidgetURL_Offset(0);
    }, [setWidgetURL_Offset]);

    const changeWidgetURLparams = useCallback(() => {
        setIsWidgetLoading(true);
        setWidgetURL_Offset((prevNum) => {
            return prevNum + 100;
        });
    }, [setIsWidgetLoading, setWidgetURL_Offset]);

    

    useEffect(() => {
        setAPI_Widget_URL(
            `https://api.nytimes.com/svc/news/v3/content/all/all.json?limit=100&offset=${widgetURL_Offset}&api-key=${nytAPI_Key}`
        );
    }, [widgetURL_Offset]);

    return (
        <WidgetUrlContext.Provider
            value={{
                API_Widget_URL,
                isMaxWidgetFetchCalls,
                changeWidgetURLparams,
                resetWidgetURLparams,
            }}
        >
            {children}
        </WidgetUrlContext.Provider>
    );
};

export default WidgetUrlProvider;
