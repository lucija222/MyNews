import { IsFetchDataContext } from "../IsFetchDataProvider";
import { nytAPI_Key } from "../../util/helpers/constants";
import {  ReactNode, createContext, useContext, useEffect, useState, } from "react";

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
    const { setIsFetchWidgetData, debounceFetch } = useContext(IsFetchDataContext);

    const [widgetURL_Offset, setWidgetURL_Offset] = useState(0);
    const [API_Widget_URL, setAPI_Widget_URL] = useState(
        `https://api.nytimes.com/svc/news/v3/content/all/all.json?limit=100&offset=${widgetURL_Offset}&api-key=${nytAPI_Key}`
    );

    const isMaxWidgetFetchCalls = widgetURL_Offset === 400;

    const resetWidgetURLparams = () => {
        setWidgetURL_Offset(0);
    };

    const changeWidgetURLparams = () => {

        setWidgetURL_Offset((prevNum) => {
            return prevNum + 100;
        });

        debounceFetch(setIsFetchWidgetData);
    };

    

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
