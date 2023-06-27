import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import WidgetCard from "../cards/WidgetCard";
import CategoryCard from "../cards/CategoryCard";
import { filterJsonData } from "../../util/helpers/functions/filterJsonData";
import { useState, useRef, useEffect, useContext, useCallback } from "react";
import { IsDesktopViewportContext } from "../../context/IsDesktopViewportProvider";

interface InfiniteScrollerProps {
    URL: string;
    cardClass: "category-card" | "widget-card";
    containerName: "category-scroller_container" | "widget-scroller_container";
}

type ArticleData = {
    url: string;
    title: string;
    byline: string;
    section: string;
    timestamp: string;
    img_src: string;
}[];

const InfiniteScroller = ({
    URL,
    cardClass,
    containerName,
}: InfiniteScrollerProps) => {
    const isDesktopViewport = useContext(IsDesktopViewportContext);
    const [articleData, setArticleData] = useState<ArticleData>([]);
    const [indexOfLastRenderedCard, setIndexOfLastRenderedCard] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const isFirstRenderRef = useRef(true);
    const slicedArticleData = articleData.slice(0, indexOfLastRenderedCard);
    const observerElemRef = useRef<HTMLDivElement | null>(null);
    const pusherElemRef = useRef<HTMLDivElement | null>(null);

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
            const filteredData = filterJsonData(jsonData);
            console.log("Fetched data");

            if (filteredData) {
                setArticleData(filteredData);
            }
        } catch (error) {
            console.error("Error in fetchData:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(URL);
    }, [fetchData, URL]);

    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observer.current = new IntersectionObserver(
            ([entry]: IntersectionObserverEntry[]) => {
                // console.log("isIntersecting:", entry.isIntersecting);

                const isThereMoreData =
                    articleData.length > indexOfLastRenderedCard;

                if (entry.isIntersecting && !isLoading) {

                    switch (isDesktopViewport) {
                        case false:
                            if (isThereMoreData) {
                                setIndexOfLastRenderedCard((prevIndex) => {
                                    return prevIndex + 6;
                                });
                            }
                            break;

                        case true:
                            switch (indexOfLastRenderedCard) {
                                case 1:
                                    setIndexOfLastRenderedCard((prevIndex) => {
                                        return prevIndex + 15;
                                    });
                                    break;

                                default:
                                    if (isThereMoreData) {
                                        setIndexOfLastRenderedCard(
                                            (prevIndex) => {
                                                return prevIndex + 12;
                                            }
                                        );
                                    }
                                    break;
                            }

                            break;

                        default:
                            console.error(
                                "Error: in observer switch statement"
                            );
                            break;
                    }
                }
            },
            { root: null, threshold: 1 }
        );

        if (!isFirstRenderRef.current && observer.current) {
            observer.current.observe(observerElemRef.current!);
        }

        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
        }

        const observerConst = observer.current;

        return () => {
            if (observerConst) {
                observerConst.disconnect();
                console.log("Unobserving");
            }
        };
    }, [indexOfLastRenderedCard, isDesktopViewport, isLoading]);

    return (
        <div className={containerName}>
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {cardClass === "category-card" &&
                slicedArticleData.map((article, index) => {
                    return (
                        <article
                            key={`category-card${index}`}
                            className="category-card"
                        >
                            <CategoryCard
                                imgSrc={article.img_src}
                                category={article.section}
                                title={article.title}
                                author={article.byline}
                                url={article.url}
                            />
                        </article>
                    );
                })}
            {cardClass === "widget-card" &&
                slicedArticleData.map((article, index) => {
                    return (
                        <article
                            key={`widget-card${index}`}
                            className={cardClass}
                        >
                            <WidgetCard
                                timestamp={article.timestamp}
                                title={article.title}
                                url={article.url}
                            />
                        </article>
                    );
                })}
            <div ref={observerElemRef} className="observerRef"></div>
            {cardClass === "widget-card" && (
                    <div ref={pusherElemRef} className="pusher-elem"></div>
                )}
        </div>
    );
};

export default InfiniteScroller;
