import RenderCards from "../cards/RenderCards";
import { useRef, useEffect, useContext } from "react";
import { IsSmallViewportContext } from "../../context/ViewportSizesProvider";
import { ArticleData } from "../cards/CardData";
import { numOfRenderedCardsContext } from "../../context/NumOfRenderedCardsProvider";
import { calcIncrementForNumOfRennderedCards } from "../../util/helpers/functions/calcIncrementForNumOfRennderedCards";

interface InfiniteScrollerProps {
    cardClass: "category-card" | "widget-card";
    isLoading: boolean;
    isFavoritesCategory: boolean;
    articleData: ArticleData;
}

const InfiniteScroller = ({
    cardClass,
    isLoading,
    isFavoritesCategory,
    articleData,
}: InfiniteScrollerProps) => {
    const isSmallViewport = useContext(IsSmallViewportContext);
    const {
        numOfRenderedCategoryCards,
        setNumOfRenderedCategoryCards,
        numOfRenderedWidgetCards,
        setNumOfRenderedWidgetCards,
    } = useContext(numOfRenderedCardsContext);
    
    const observer = useRef<IntersectionObserver | null>(null);
    const observerElemRef = useRef<HTMLDivElement | null>(null);
    const isFirstRenderRef = useRef(true);

    const isCategoryCard = cardClass === "category-card";
    const correctNumOfRenderedCards = isCategoryCard
        ? numOfRenderedCategoryCards
        : numOfRenderedWidgetCards;
    const setCorrectNumOfRenderedCards = isCategoryCard
        ? setNumOfRenderedCategoryCards
        : setNumOfRenderedWidgetCards;
    const slicedArticleData = articleData.slice(0, correctNumOfRenderedCards);
    const isThereMoreData = articleData.length > correctNumOfRenderedCards;
    const remainingDataLength = articleData.length - 1 - (slicedArticleData.length - 1);


    useEffect(() => {
        observer.current = new IntersectionObserver(
            ([entry]: IntersectionObserverEntry[]) => {
                if (entry.isIntersecting && !isLoading) {
                    switch (isSmallViewport) {
                        case true:
                            if (isThereMoreData) {
                                setCorrectNumOfRenderedCards((prevIndex) => {
                                    let incrementNum =
                                        calcIncrementForNumOfRennderedCards(
                                            remainingDataLength,
                                            7
                                        );
                                    return prevIndex + incrementNum;
                                });
                            }
                            break;

                        case false:
                            switch (correctNumOfRenderedCards) {
                                case 1:
                                    setCorrectNumOfRenderedCards(
                                        (prevIndex) => {
                                            return prevIndex + 15;
                                        }
                                    );
                                    break;

                                default:
                                    if (isThereMoreData) {
                                        setCorrectNumOfRenderedCards(
                                            (prevIndex) => {
                                                
                                                let incrementNumber =
                                                    calcIncrementForNumOfRennderedCards(
                                                        remainingDataLength,
                                                        12
                                                    );
                                                return (
                                                    prevIndex + incrementNumber!
                                                );
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
                // console.log("Unobserving");
            }
        };
    }, [
        isLoading,
        isSmallViewport,
        isThereMoreData,
        correctNumOfRenderedCards,
        setCorrectNumOfRenderedCards,
    ]);

    return (
        <>
            <RenderCards
                cardClass={cardClass}
                isFavoritesCategory={isFavoritesCategory}
                cardData={slicedArticleData}
                observerElemRef={observerElemRef}
            />
        </>
    );
};

export default InfiniteScroller;
