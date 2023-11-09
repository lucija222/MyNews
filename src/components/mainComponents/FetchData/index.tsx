import Loader from "../../UIcomponents/Loader";
import ErrorMessage from "../../UIcomponents/ErrorMessage";
import { CategoryUrlContext } from "../../../context/urlContexts/CategoryUrlProvider";
import InfiniteScroller from "../scrollerComponents/InfiniteScroller";
import { useCallback, useContext, useEffect, useState, useRef } from "react";
import { SelectedCategoryContext } from "../../../context/SelectedCategoryProvider";
import { IsLoadingContext, SetIsLoadingContext } from "../../../context/IsLoadingProvider";
import { filterJsonData } from "../../../util/helpers/functions/filterJSON/filterJsonData";
import { allowOrDisableScroll } from "../../../util/helpers/functions/allowOrDisableScroll";
import { replaceOrMergeArticleData } from "../../../util/helpers/functions/replaceOrMergeArticleData";
import { WidgetUrlContext } from "../../../context/urlContexts/WidgetUrlProvider";

export type ArticleData = {
    url: string;
    title: string;
    byline: string;
    section: string;
    timestamp: string;
    img_src: string;
    img_objSrc: string;
    isFavorite: boolean;
}[];

interface CardDataProps {
    cardClass: "category-card" | "widget-card";
}

const FetchData = ({ cardClass }: CardDataProps) => {
    const [isError, setIsError] = useState(false);
    const [articleData, setArticleData] = useState<ArticleData>([]);

    const { selectedCategory } = useContext(SelectedCategoryContext);
    const { isCategoryLoading, isWidgetLoading } = useContext(IsLoadingContext);
    const { setIsCategoryLoading, setIsWidgetLoading } = useContext(SetIsLoadingContext);
    const { API_Card_URL, setTotalSearchResultsNum } = useContext(CategoryUrlContext);
    const { API_Widget_URL } = useContext(WidgetUrlContext);

    const isFavoritesCategory = selectedCategory === "Favorites";
    const isSearchCategory = selectedCategory === "searchResults";
    const isThereArticleData = articleData.length > 0;
    const isCategoryCard = cardClass === "category-card";

    const URL = isCategoryCard ? API_Card_URL : API_Widget_URL;
    const isLoading = isCategoryCard ? isCategoryLoading : isWidgetLoading;
    const setIsLoading = isCategoryCard
        ? setIsCategoryLoading
        : setIsWidgetLoading;
    const fetchNumRef = useRef(0);
    const timeoutIdRef = useRef<null | NodeJS.Timeout>(null);

    const fetchData = useCallback(
        async (URL: string) => {
            fetchNumRef.current = fetchNumRef.current + 1;
            console.log("Fetch ran", cardClass, fetchNumRef.current, URL);
            try {
                const response = await fetch(URL);

                if (!response.ok) {
                    console.error("Error: !response.ok");
                    setIsError(true);
                    return;
                }

                const jsonData = await response.json();

                if (
                    selectedCategory === "searchResults" &&
                    URL.includes("page=1&")
                ) {
                    setTotalSearchResultsNum(
                        Math.floor(jsonData.totalResults / 100)
                    );
                }

                const filteredData = await filterJsonData(
                    jsonData,
                    selectedCategory,
                    cardClass
                );
                
                if (filteredData) {
                    setArticleData((prevData) => {
                        return replaceOrMergeArticleData(
                            prevData,
                            cardClass,
                            selectedCategory,
                            filteredData,
                            URL
                        );
                    });
                }
            } catch (error) {
                setIsError(true);
                console.error("Error in fetchData:", cardClass, error);

            } finally {
                setIsLoading(false);
            }
        },
        [
            setIsLoading,
            cardClass,
            selectedCategory,
            setTotalSearchResultsNum,
        ]
    );

    const debounceFetchCalls = useCallback(
        (url: string, fetchFunc: (URL: string) => Promise<void>) => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }

            timeoutIdRef.current = setTimeout(() => {
                fetchFunc(url);
            }, 100);
        }, []);

    useEffect(() => {
        allowOrDisableScroll(isError);
    }, [isError]);

    useEffect(() => {   
        if (URL && isLoading) {
            debounceFetchCalls(URL, fetchData);
        } 
    }, [
        URL,
        isLoading,
        debounceFetchCalls,
        fetchData,
    ]);

    return (
        <>
            {isLoading && <Loader cardClass={cardClass} />}
            {isError && <ErrorMessage />}
            {(isThereArticleData || isSearchCategory) && ( 
                <InfiniteScroller
                    isCategoryCard={isCategoryCard}
                    isLoading={isLoading}
                    isFavoritesCategory={isFavoritesCategory}
                    articleData={articleData}
                />
            )} 
        </>
    );
};

export default FetchData;
