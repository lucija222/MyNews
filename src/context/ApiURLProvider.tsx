import { IsFetchDataContext } from "./IsFetchDataProvider";
import { newsAPI_Key, nytAPI_Key } from "../util/helpers/constants";
import { SelectedCategoryContext } from "./SelectedCategoryProvider";
import { EncodedSearchInputContext } from "./EncodedSearchInputProvider";
import {
    ReactNode, createContext, useContext, useEffect, useState,
} from "react";
import { SetIsLoadingContext } from "./IsLoadingProvider";
interface IApiURLContext {
    API_Card_URL: string;
    API_Widget_URL: string;
    isMaxCategoryFetchCalls: boolean;
    isMaxWidgetFetchCalls: boolean;
    returnMaxFetchNum: () => number;
    changeCardURLparams: () => void;
    changeWidgetURLparams: () => void;
    resetCardURLparams: () => void;
}

export const ApiURLContext = createContext<IApiURLContext>({
    API_Card_URL: `https://api.nytimes.com/svc/news/v3/content/nyt/homepage.json?limit=100&offset=0&api-key=${nytAPI_Key}`,
    API_Widget_URL: `https://api.nytimes.com/svc/news/v3/content/all/all.json?limit=100&offset=0&api-key=${nytAPI_Key}`,
    isMaxCategoryFetchCalls: false,
    isMaxWidgetFetchCalls: false,
    returnMaxFetchNum: () => 400,
    changeCardURLparams: () => {},
    changeWidgetURLparams: () => {},
    resetCardURLparams: () => {},
});

const ApiURLProvider = ({ children }: { children: ReactNode }) => {
    const { selectedCategory } = useContext(SelectedCategoryContext);
    const { encodedSearchInput } = useContext(EncodedSearchInputContext);
    const { setIsFetchCategoryData, setIsFetchWidgetData } =
        useContext(IsFetchDataContext);
    const { setIsCategoryLoading, setIsWidgetLoading } = useContext(SetIsLoadingContext);

    const [cardURL_Offset, setCardURL_Offset] = useState(0);
    const [API_Card_URL, setAPI_Card_URL] = useState(
        `https://api.nytimes.com/svc/news/v3/content/nyt/homepage.json?limit=100&offset=${cardURL_Offset}&api-key=${nytAPI_Key}`
    );

    const [widgetURL_Offset, setWidgetURL_Offset] = useState(0);
    const [API_Widget_URL, setAPI_Widget_URL] = useState(
        `https://api.nytimes.com/svc/news/v3/content/all/all.json?limit=100&offset=${widgetURL_Offset}&api-key=${nytAPI_Key}`
    );

    const returnMaxFetchNum = () => {
        switch (selectedCategory) {
            case "Health":
                return 200;

            case "Technology":
                return 300;

            default:
                return 400;
        }
    };

    const isMaxCategoryFetchCalls = cardURL_Offset === returnMaxFetchNum();
    const isMaxWidgetFetchCalls = widgetURL_Offset === 400;

    const resetCardURLparams = () => {
        setCardURL_Offset(0);
    };

    const changeCardURLparams = () => {
        if (
            selectedCategory !== "Favorites" &&
            selectedCategory !== "searchResults"
        ) {
            
            setCardURL_Offset((prevNum) => {
                return prevNum + 100;
            });

            setIsCategoryLoading(true);

            setTimeout(() => {
                setIsFetchCategoryData(true);
            }, 10);
        }
    };

    const changeWidgetURLparams = () => {
        setWidgetURL_Offset((prevNum) => {
            return prevNum + 100;
        });

        setIsWidgetLoading(true);

        setTimeout(() => {
            setIsFetchWidgetData(true);
        }, 10);
    };

    useEffect(() => {
        switch (selectedCategory) {
            case "Home":
                setAPI_Card_URL(
                    `https://api.nytimes.com/svc/news/v3/content/nyt/homepage.json?limit=100&offset=${cardURL_Offset}&api-key=${nytAPI_Key}`
                );
                return;

            case "General":
                setAPI_Card_URL(
                    `https://api.nytimes.com/svc/news/v3/content/nyt/world.json?limit=100&offset=${cardURL_Offset}&api-key=${nytAPI_Key}`
                );
                return;

            case "searchResults":
                setAPI_Card_URL(
                    `https://newsapi.org/v2/everything?q=${encodedSearchInput}&searchIn=title&language=en&page=1&apiKey=${newsAPI_Key}`
                );
                return;

            case "Favorites":
                setAPI_Card_URL("");
                return;

            default:
                setAPI_Card_URL(
                    `https://api.nytimes.com/svc/news/v3/content/nyt/${selectedCategory.toLowerCase()}.json?limit=100&offset=${cardURL_Offset}&api-key=${nytAPI_Key}`
                );
                return;
        }
    }, [selectedCategory, cardURL_Offset, encodedSearchInput]);

    useEffect(() => {
        setAPI_Widget_URL(
            `https://api.nytimes.com/svc/news/v3/content/all/all.json?limit=100&offset=${widgetURL_Offset}&api-key=${nytAPI_Key}`
        );
    }, [widgetURL_Offset]);

    return (
        <ApiURLContext.Provider
            value={{
                API_Card_URL,
                API_Widget_URL,
                isMaxCategoryFetchCalls,
                isMaxWidgetFetchCalls,
                returnMaxFetchNum,
                changeCardURLparams,
                changeWidgetURLparams,
                resetCardURLparams,
            }}
        >
            {children}
        </ApiURLContext.Provider>
    );
};

export default ApiURLProvider;