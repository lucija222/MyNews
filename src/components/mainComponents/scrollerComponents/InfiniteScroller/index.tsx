import RenderScroller from "../RenderScroller";
import { ArticleData } from "../../FetchData";
import { useRef, useEffect, useContext, useCallback } from "react";
import { ApiURLContext } from "../../../../context/ApiURLProvider";
import { NumOfRenderedCardsContext } from "../../../../context/NumOfRenderedCardsProvider";

interface InfiniteScrollerProps {
    isCategoryCard: boolean;
    isLoading: boolean;
    isFavoritesCategory: boolean;
    articleData: ArticleData;
}

const InfiniteScroller = ({
    isCategoryCard, isLoading, isFavoritesCategory, articleData,
}: InfiniteScrollerProps) => {
    const {
        numOfRenderedCategoryCards, setNumOfRenderedCategoryCards,
        numOfRenderedWidgetCards, setNumOfRenderedWidgetCards,
    } = useContext(NumOfRenderedCardsContext);
    const {
        changeCardURLparams, changeWidgetURLparams,
        isMaxCategoryFetchCalls, isMaxWidgetFetchCalls, maxFetchNum,
    } = useContext(ApiURLContext);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const observerElemRef = useRef<HTMLDivElement | null>(null);

    const correctNumOfRenderedCards = isCategoryCard
        ? numOfRenderedCategoryCards
        : numOfRenderedWidgetCards;
    const setCorrectNumOfRenderedCards = isCategoryCard
        ? setNumOfRenderedCategoryCards
        : setNumOfRenderedWidgetCards;
    const changeURLparams = isCategoryCard 
        ? changeCardURLparams 
        : changeWidgetURLparams;
    const isMaxFetchCalls = isCategoryCard 
        ? isMaxCategoryFetchCalls 
        : isMaxWidgetFetchCalls;

    const slicedArticleData = articleData.slice(0, correctNumOfRenderedCards);
    const dataLength = articleData.length;
    const slicedDataLength = slicedArticleData.length;

    const remainingDataLength = dataLength - slicedDataLength;
    const isThereMoreData = remainingDataLength > 0;
    const isAwaitingFetch = dataLength < correctNumOfRenderedCards;

    const isDataLessThan18 = remainingDataLength < 18;
    const shouldNumIncrement = slicedDataLength === correctNumOfRenderedCards;

    const isAllDataRendered =
        dataLength > maxFetchNum() &&
        dataLength === slicedDataLength &&
        isMaxFetchCalls;

    const observerCallback = useCallback(
        ([entry]: IntersectionObserverEntry[]) => {

            if (entry.isIntersecting && !isLoading && !isAwaitingFetch) {

                if (isThereMoreData && !isDataLessThan18 && shouldNumIncrement) {
                    setCorrectNumOfRenderedCards((prevIndex) => {
                        return prevIndex + 18;
                    });
                    return;

                } else if (
                    !isMaxFetchCalls &&
                    ((isThereMoreData && isDataLessThan18) || !isThereMoreData)
                ) {
                    changeURLparams();
                    setCorrectNumOfRenderedCards((prevIndex) => {
                        return prevIndex + 18;
                    });
                    return;

                } else if (isThereMoreData && isDataLessThan18 && isMaxFetchCalls) {              
                    setCorrectNumOfRenderedCards((prevIndex) => {
                        return prevIndex + remainingDataLength;
                    });

                    return;
                }
            }
        },
        [
            isLoading, isAwaitingFetch,
            isThereMoreData, isDataLessThan18,
            remainingDataLength, isMaxFetchCalls,
            shouldNumIncrement, changeURLparams,
            setCorrectNumOfRenderedCards,
        ]
    );

    useEffect(() => {
        observerRef.current = new IntersectionObserver(observerCallback, {
            root: null,
            threshold: 0.5,
        });

        const observer = observerRef.current;
        const observerElem = observerElemRef.current;

        if (observerElem && observer && !isAllDataRendered) {  
            observer.observe(observerElem);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [observerCallback, isAllDataRendered]);

    return (
        <>
            <RenderScroller
                isCategoryCard={isCategoryCard}
                isFavoritesCategory={isFavoritesCategory}
                articleData={slicedArticleData}
                observerElemRef={observerElemRef}
            />
        </>
    );
};

export default InfiniteScroller;