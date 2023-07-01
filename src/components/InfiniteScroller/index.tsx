import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import RenderCards from "../cards/RenderCards";
// import { TESTING_jsonData } from "../../util/helpers/constants";
import { filterJsonData } from "../../util/helpers/functions/filterJsonData";
import {
    useState,
    useRef,
    useEffect,
    useContext,
    useCallback
} from "react";
import { IsSmallViewportContext } from "../../context/ViewportSizesProvider";
import { TESTING_jsonData } from "../../util/helpers/constants";

interface InfiniteScrollerProps {
    URL: string;
    cardClass: "category-card" | "widget-card";
}

export type ArticleData = {
    url: string;
    title: string;
    byline: string;
    section: string;
    timestamp: string;
    img_src: string;
}[];

const InfiniteScroller = ({ URL, cardClass }: InfiniteScrollerProps) => {
    const [articleData, setArticleData] = useState<ArticleData>([]);
    const [indexOfLastRenderedCard, setIndexOfLastRenderedCard] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const isSmallViewport = useContext(IsSmallViewportContext);
    const observer = useRef<IntersectionObserver | null>(null);
    const observerElemRef = useRef<HTMLDivElement | null>(null);
    const isFirstRenderRef = useRef(true);

    const slicedArticleData = articleData.slice(0, indexOfLastRenderedCard);
    const isCategoryCard = cardClass === "category-card";
    const isWidgetCard = cardClass === "widget-card";

    // const fetchData = useCallback(
    //     async (URL: string) => {
    //         setIsLoading(true);
    //         try {
    //             const response = await fetch(URL);

    //             if (!response.ok) {
    //                 console.error("Error: !response.ok");
    //                 setIsError(true);
    //                 return;
    //             }

    //             const jsonData = await response.json();
    //             const filteredData = filterJsonData(jsonData);
    //             console.log("Fetched data");

    //             if (filteredData) {
    //                 setArticleData(filteredData);
    //             }
    //         } catch (error) {
    //             console.error("Error in fetchData:", error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     },
    //     []
    // );

    // useEffect(() => {
    //     fetchData(URL);
    // }, [fetchData, URL]);
    const fetchData = useCallback(
        async (/*URL: string*/) => {
            setIsLoading(true);
            try {
                // const response = await fetch(URL);

                // if (!response.ok) {
                //     console.error("Error: !response.ok");
                //     setIsError(true);
                //     return;
                // }

                // const jsonData = await response.json();
                const jsonData = TESTING_jsonData;
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
        },
        []
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        observer.current = new IntersectionObserver(
            ([entry]: IntersectionObserverEntry[]) => {
                // console.log("isIntersecting:", entry.isIntersecting);

                const isThereMoreData =
                    articleData.length > indexOfLastRenderedCard;

                if (entry.isIntersecting && !isLoading) {
                    switch (isSmallViewport) {
                        case true:
                            if (isThereMoreData) {
                                setIndexOfLastRenderedCard((prevIndex) => {
                                    return prevIndex + 8;
                                });
                            }
                            break;

                        case false:
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
            { root: null, threshold: 0.1 }
        );

        if (!isFirstRenderRef.current && observerElemRef.current) {
            observer.current.observe(observerElemRef.current);
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
    }, [
        isLoading,
        isSmallViewport,
        indexOfLastRenderedCard,
        articleData.length
    ]);

    return (
        <>
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            <RenderCards
                cardClass={cardClass}
                isCategoryCard={isCategoryCard}
                isWidgetCard={isWidgetCard}
                cardData={slicedArticleData}
                observerElemRef={observerElemRef}
            />
        </>
    );
};

export default InfiniteScroller;
