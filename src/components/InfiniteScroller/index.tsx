import { useState, useRef, useEffect, useContext } from "react";
import { IsDesktopViewportContext } from "../../context/IsDesktopViewportProvider";
import { NewDataArray, filtered_Newswire } from "../../interfaces&types/NYT_API_interface";
import CategoryCard from "../cards/CategoryCard";
import WidgetCard from "../cards/WidgetCard";
import Loader from "../Loader";

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
    const [isFirstRender, setIsFirstRender] = useState(true);
    const slicedArticleData = articleData.slice(0, indexOfLastRenderedCard);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const fetchData = async (URL: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(URL);

            if (!response.ok) {
                console.error("Error: !response.ok");
                //Display error message
            }

                const jsonData = await response.json();
                let newDataArray: NewDataArray | null = null;
                jsonData.results.forEach((articleObject: filtered_Newswire) => {
                    if (articleObject.byline && articleObject.section) {
                        const mapped = {
                            url: articleObject.url,
                            title: articleObject.title,
                            byline: articleObject.byline,
                            section: articleObject.section,
                            timestamp: articleObject.created_date,
                            img_src: articleObject.multimedia[0].url
                        };
                        if (!newDataArray) {
                            newDataArray = [mapped];
                        } else {
                            newDataArray.push(mapped);
                        }
                    }
                });
                if (newDataArray) {
                    setArticleData(newDataArray);
                }

        } catch (error) {
            console.error("Error in fetchData:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(URL);
    }, [URL]);

    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observer.current = new IntersectionObserver(
            ([entry]: IntersectionObserverEntry[]) => {
                console.log("observing", entry);

                if (entry.isIntersecting) {
                    switch (isDesktopViewport) {
                        case false:
                            setIndexOfLastRenderedCard((prevIndex) => {
                                return prevIndex + 6;
                            });
                            break;

                        case true:
                            switch (indexOfLastRenderedCard) {
                                case 1:
                                    setIndexOfLastRenderedCard((prevIndex) => {
                                        return prevIndex + 15;
                                    });
                                    break;

                                case 15:
                                    setIndexOfLastRenderedCard((prevIndex) => {
                                        return prevIndex + 12;
                                    });
                                    break;

                                default:
                                    break;
                            }

                            break;

                        default:
                            console.error(
                                "Error in switch statement while loading more cards"
                            );
                            break;
                    }
                }
            },
            { root: null, threshold: 1 }
        );

        if (!isFirstRender && observer.current) {
            observer.current.observe(observerRef.current!);
        }

        if (isFirstRender) {
            setIsFirstRender(false);
        }

        const observerConst = observer.current;
        const observerRefConst = observerRef.current;
        console.log("ArticleData",articleData);
        
        
        return () => {
            if (observerConst && observerRefConst) {
                observerConst.unobserve(observerRefConst);
                console.log("Unobserving");
            }
        };
    }, [articleData, indexOfLastRenderedCard, isDesktopViewport, isFirstRender]);

    return (
        <div className={containerName}>
            {isLoading && <Loader />}
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
                                />
                            </article>
                        );
                    })}
            <div ref={observerRef} className="observerRef"></div>
        </div>
    );
};

export default InfiniteScroller;
