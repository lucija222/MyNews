import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Loader from "../../UIcomponents/Loader";
import InfiniteScroller from "../scrollerComponents/InfiniteScroller";
import ErrorMessage from "../../UIcomponents/ErrorMessage";
import { ApiURLContext } from "../../../context/ApiURLProvider";
import { IsFetchDataContext } from "../../../context/IsFetchDataProvider";
import { SelectedCategoryContext } from "../../../context/SelectedCategoryProvider";
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
    isFavorite: boolean;
}[];

interface CardDataProps {
    cardClass: "category-card" | "widget-card";
}

const FetchAndFilterData = ({ cardClass }: CardDataProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [articleData, setArticleData] = useState<ArticleData>([]);

    const { selectedCategory } = useContext(SelectedCategoryContext);
    const {
        isFetchCategoryData,
        isFetchWidgetData,
        setIsFetchCategoryData,
        setIsFetchWidgetData,
    } = useContext(IsFetchDataContext);

    const { API_Card_URL, API_Widget_URL } = useContext(ApiURLContext);

    const isFavoritesCategory = selectedCategory === "Favorites";
    const isThereArticleData = articleData.length > 0;
    const isCategoryCard = cardClass === "category-card";

    const URL = isCategoryCard ? API_Card_URL : API_Widget_URL;
    const isFetchData = isCategoryCard
        ? isFetchCategoryData
        : isFetchWidgetData;
    const setIsFetchData = isCategoryCard
        ? setIsFetchCategoryData
        : setIsFetchWidgetData;

    const indexRef = useRef(0);
    const newsAPItotalResultsRef = useRef(0); 

    const fetchData = useCallback(
        async (URL: string) => {
            setIsLoading(true);
            indexRef.current = indexRef.current + 1;
            console.log("Fetch ran", cardClass, indexRef.current, "URL:", URL);

            try {
                const response = await fetch(URL);

                if (!response.ok) {
                    console.error("Error: !response.ok");
                    setIsError(true);
                    return;
                }

                const jsonData = await response.json();
                
                const filteredData = filterJsonData(
                    jsonData,
                    selectedCategory,
                    cardClass, 
                    newsAPItotalResultsRef
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
                }, 10);
            }
        },
        [
            cardClass,
            selectedCategory,
            isThereArticleData,
        ]
    );

    useEffect(() => {
        allowOrDisableScroll(isError);
    }, [isError]);

    useEffect(() => {
        console.log("isFetchData", cardClass, isFetchData);

        if (URL && (isFetchData || !isThereArticleData)) {
            setIsFetchData(false);
            fetchData(URL);
        }
    }, [
        isFavoritesCategory,
        fetchData,
        isThereArticleData,
        URL,
        isFetchData,
        setIsFetchData,
    ]);

    useEffect(() => {
        console.log("ARTICLE DATA", cardClass, articleData);
    }, [articleData, cardClass]);

    return (
        <>
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {isThereArticleData && (
                <InfiniteScroller
                    cardClass={cardClass}
                    isLoading={isLoading}
                    isFavoritesCategory={isFavoritesCategory}
                    articleData={articleData}
                />
            )}
        </>
    );
};

export default FetchAndFilterData;