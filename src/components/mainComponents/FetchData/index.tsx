import Loader from "../../UIcomponents/Loader";
import ErrorMessage from "../../UIcomponents/ErrorMessage";
import { ApiURLContext } from "../../../context/ApiURLProvider";
import InfiniteScroller from "../scrollerComponents/InfiniteScroller";
import { useCallback, useContext, useEffect, useState, } from "react";
import { IsFetchDataContext } from "../../../context/IsFetchDataProvider";
import { SelectedCategoryContext } from "../../../context/SelectedCategoryProvider";
import { IsLoadingContext, SetIsLoadingContext } from "../../../context/IsLoadingProvider";
import { filterJsonData } from "../../../util/helpers/functions/filterJSON/filterJsonData";
import { allowOrDisableScroll } from "../../../util/helpers/functions/allowOrDisableScroll";
import { replaceOrMergeArticleData } from "../../../util/helpers/functions/replaceOrMergeArticleData";

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
    const {setIsCategoryLoading, setIsWidgetLoading} = useContext(SetIsLoadingContext);
    const {
        isFetchCategoryData, isFetchWidgetData,
        setIsFetchCategoryData, setIsFetchWidgetData
    } = useContext(IsFetchDataContext);

    const { API_Card_URL, API_Widget_URL, setTotalSearchResultsNum } = useContext(ApiURLContext);

    const isFavoritesCategory = selectedCategory === "Favorites";
    const isThereArticleData = articleData.length > 0;
    const isCategoryCard = cardClass === "category-card";

    const URL = isCategoryCard ? API_Card_URL : API_Widget_URL;
    const isLoading = isCategoryCard ? isCategoryLoading : isWidgetLoading;
    const setIsLoading = isCategoryCard ? setIsCategoryLoading : setIsWidgetLoading;
    const isFetchData = isCategoryCard ? isFetchCategoryData : isFetchWidgetData;
    const setIsFetchData = isCategoryCard ? setIsFetchCategoryData: setIsFetchWidgetData;
    // const fetchNumRef = useRef(0);

    const fetchData = useCallback(
        async (URL: string) => {
            if (!isLoading) {
                setIsLoading(true);
            }
            // fetchNumRef.current = fetchNumRef.current + 1;
            // console.log("Fetch ran", cardClass, fetchNumRef.current);
            try {
                const response = await fetch(URL);

                if (!response.ok) {
                    console.error("Error: !response.ok");
                    setIsError(true);
                    return;
                }

                const jsonData = await response.json();

                if (selectedCategory === "searchResults" && URL.includes("page=1&")) {
                    setTotalSearchResultsNum(Math.floor(jsonData.totalResults / 100));
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
                            isThereArticleData,
                            filteredData,
                            URL
                        );
                    });
                }
            } catch (error) {
                console.error("Error in fetchData:", cardClass, error);

            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 200);  
            }
        },
        [isLoading, setIsLoading, cardClass, selectedCategory, isThereArticleData, setTotalSearchResultsNum]
    );

    useEffect(() => {
        allowOrDisableScroll(isError);
    }, [isError]);

    useEffect(() => {
        if (URL && (isFetchData || !isThereArticleData)) {
            setIsFetchData(false);
            fetchData(URL);
        }
    }, [
        URL,
        isFetchData,
        isThereArticleData,
        setIsFetchData,
        fetchData,
    ]);

    return (
        <>
            {isLoading && <Loader cardClass={cardClass} />}
            {isError && <ErrorMessage />}
            {isThereArticleData && (
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
