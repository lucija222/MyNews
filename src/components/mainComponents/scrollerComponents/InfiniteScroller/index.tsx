import { ArticleData } from "../../FetchAndFilterData";
import RenderGridAndScrollers from "../../RenderGridAndScrollers";
import { useRef, useEffect, useContext, useCallback, useState } from "react";
import { ApiURLContext } from "../../../../context/ApiURLProvider";
import { NumOfRenderedCardsContext } from "../../../../context/NumOfRenderedCardsProvider";

interface InfiniteScrollerProps {
    isCategoryCard: boolean;
    isLoading: boolean;
    isFavoritesCategory: boolean;
    isSearchCategory: boolean;
    articleData: ArticleData;
}

const InfiniteScroller = ({
    isCategoryCard, isLoading, isFavoritesCategory, isSearchCategory, articleData
}: InfiniteScrollerProps) => {

    const {
        numOfRenderedCategoryCards, setNumOfRenderedCategoryCards,
        numOfRenderedWidgetCards, setNumOfRenderedWidgetCards,
    } = useContext(NumOfRenderedCardsContext);

    const { changeCardURLparams, changeWidgetURLparams, isMaxFetchCalls } =
        useContext(ApiURLContext);

    const [intersectionNum, setIntersectionNum] = useState(0);
    const prevIntersectionNumRef = useRef(0);
    const isMountingRef = useRef(true);
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

    const slicedArticleData = articleData.slice(0, correctNumOfRenderedCards);
    const dataLength = articleData.length;
    const slicedDataLength = slicedArticleData.length;

    const remainingDataLength = dataLength - slicedDataLength;
    const isThereMoreData = remainingDataLength > 0;

    const isDataLessThan18 = remainingDataLength < 18;
    const shouldNumIncrement = slicedDataLength === correctNumOfRenderedCards;

    const isAllDataRendered =
        dataLength === slicedDataLength && isMaxFetchCalls;

    const updateNumOfCardsAndURLparams = useCallback(() => {

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
    }, [
        isThereMoreData,
        isDataLessThan18,
        remainingDataLength,
        isMaxFetchCalls,
        shouldNumIncrement,
        setCorrectNumOfRenderedCards,
        changeURLparams,
    ]);

    useEffect(() => {
        if (isMountingRef.current) {
            observerRef.current = new IntersectionObserver(
                ([entry]: IntersectionObserverEntry[]) => {

                    if (entry.isIntersecting && !isLoading) {
                        setIntersectionNum((prevNum) => {
                            console.log("prevNum", prevNum);
                            
                            return prevNum + 1;
                        });
                    }
                },
                {
                    root: null,
                    threshold: 0.1,
                }
            );

            isMountingRef.current = false;
        }

        const observerConst = observerRef.current;

        if (observerElemRef.current && observerConst) {
            observerConst.observe(observerElemRef.current);
        }

        return () => {
            if (observerConst) {
                observerConst.disconnect();
            }
        };
    }, [isLoading]);

    useEffect(() => {
        if (intersectionNum !== prevIntersectionNumRef.current) {
            updateNumOfCardsAndURLparams();
            prevIntersectionNumRef.current = intersectionNum;
        }
    }, [intersectionNum, updateNumOfCardsAndURLparams]);

    return (
        <>
            <RenderGridAndScrollers
                isCategoryCard={isCategoryCard}
                isFavoritesCategory={isFavoritesCategory}
                articleData={isSearchCategory ? articleData : slicedArticleData}
                isAllDataRendered={isAllDataRendered}
                observerElemRef={observerElemRef}
            />
        </>
    );
};

export default InfiniteScroller;