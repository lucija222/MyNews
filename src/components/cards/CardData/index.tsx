import { useCallback, useContext, useEffect, useState } from "react";
import InfiniteScroller from "../../InfiniteScroller";
import { filterJsonData } from "../../../util/helpers/functions/filterJsonData";
import Loader from "../../Loader";
import ErrorMessage from "../../ErrorMessage";
import RenderCards from "../RenderCards";
import { FavoriteArticlesDataContext } from "../../../context/FavoriteArticlesDataProvider";
import { TESTING_jsonData } from "../../../util/helpers/constants";

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
    URL: string;
    cardClass: "category-card" | "widget-card";
    isFavoritesCategory: boolean;
}

const CardData = ({ URL, cardClass, isFavoritesCategory }: CardDataProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [articleData, setArticleData] = useState<ArticleData>([]);
    const { favoriteArticlesArray } = useContext(FavoriteArticlesDataContext);


    const fetchData = useCallback(async (URL: string) => {

        setIsLoading(true);

        try {
            const response = await fetch(URL);

            if (!response.ok) {
                console.error("Error: !response.ok");
                setIsError(true);
                return;
            }

            const jsonData = await response.json();
            const filteredData = filterJsonData(jsonData, URL);
            // console.log("Fetched", cardClass);

            if (filteredData) {
                setArticleData(filteredData);
            }
        } catch (error) {
            console.error("Error in fetchData:", error);
        } finally {
            setIsLoading(false);
        }
    }, [cardClass]);

    useEffect(() => {  
        if (!isFavoritesCategory) {
            fetchData(URL);
        }
    }, [isFavoritesCategory, fetchData, URL]);

    return (
        <>
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {isFavoritesCategory ? (
                <RenderCards
                    cardClass={cardClass}
                    isFavoritesCategory={isFavoritesCategory}
                    cardData={favoriteArticlesArray}
                />
            ) : (
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

export default CardData;
