import { ArticleData } from "../../FetchAndFilterData";
import RenderGridAndScrollers from "../../RenderGridAndScrollers";
import { useRef, useEffect, useContext, useCallback } from "react";
import { ApiURLContext } from "../../../../context/ApiURLProvider";
import { NumOfRenderedCardsContext } from "../../../../context/NumOfRenderedCardsProvider";

interface InfiniteScrollerProps {
    cardClass: "category-card" | "widget-card";
    isLoading: boolean;
    isFavoritesCategory: boolean;
    articleData: ArticleData;
};

const InfiniteScroller = ({
    cardClass,
    isLoading,
    isFavoritesCategory,
    articleData,
}: InfiniteScrollerProps) => {
    const {
        numOfRenderedCategoryCards,
        setNumOfRenderedCategoryCards,
        numOfRenderedWidgetCards,
        setNumOfRenderedWidgetCards,
    } = useContext(NumOfRenderedCardsContext);
    const { changeCardURLparams, changeWidgetURLparams } =
        useContext(ApiURLContext);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const observerElemRef = useRef<HTMLDivElement | null>(null);

    const isCategoryCard = cardClass === "category-card";

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
    const isThereMoreData = articleData.length > correctNumOfRenderedCards;
    const remainingDataLength =
        articleData.length - 1 - (slicedArticleData.length - 1);

    const observerCallback = useCallback(
        ([entry]: IntersectionObserverEntry[]) => {
            if (entry.isIntersecting && !isLoading) {
                if (isThereMoreData) {
                    console.log(remainingDataLength);

                    switch (remainingDataLength < 16) {
                        case true:
                            console.log("INCREMENT & TRIGGER FETCH");
                            changeURLparams();
                            setCorrectNumOfRenderedCards((prevIndex) => {
                                return prevIndex + 16;
                            });
                            return;

                        case false:
                            console.log("INCREMENT RAN");
                            setCorrectNumOfRenderedCards((prevIndex) => {
                                return prevIndex + 16;
                            });
                            return;
                    }
                }
                changeURLparams();

                // if (isThereMoreData) {
                //     console.log("INCREMENT RAN");

                //     setCorrectNumOfRenderedCards((prevIndex) => {
                //         let incrementNum = calcIncrementForNumOfRennderedCards(
                //             remainingDataLength,
                //             16
                //         );
                //         return prevIndex + incrementNum;
                //     });
                // } else if (!isThereMoreData) {
                //     changeURLparams();
                // }
            }
        },
        [
            isLoading,
            isThereMoreData,
            setCorrectNumOfRenderedCards,
            remainingDataLength,
            changeURLparams
        ]
    );

    // useEffect(() => {
    //     console.log("SCROLLER - data", cardClass, slicedArticleData);
    // }, [slicedArticleData]);

    // useEffect(() => {
    //     console.log(
    //         cardClass,
    //         "Widget:",
    //         numOfRenderedWidgetCards,
    //         "Card:",
    //         numOfRenderedCategoryCards,
    //         "CorrectNum:",
    //         correctNumOfRenderedCards,
    //         "DataLength:",
    //         articleData.length,
    //         "isThereMoreData:",
    //         isThereMoreData
    //     );
    // }, [
    //     cardClass,
    //     numOfRenderedWidgetCards,
    //     numOfRenderedCategoryCards,
    //     correctNumOfRenderedCards,
    // ]);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(observerCallback, {
            root: null,
            threshold: 0.1,
        });

        // console.log("observer created", cardClass);

        const observerConst = observerRef.current;

        if (observerElemRef.current && observerConst) {
            observerConst.observe(observerElemRef.current);
            // console.log("OBSERVING", cardClass);
        }

        return () => {
            if (observerConst) {
                observerConst.disconnect();
                // console.log("UNOBSERVING", cardClass);
            }
        };
    }, [observerCallback]);

    return (
        <>
            <RenderGridAndScrollers
                cardClass={cardClass}
                isFavoritesCategory={isFavoritesCategory}
                articleData={slicedArticleData}
                observerElemRef={observerElemRef}
            />
        </>
    );
};

export default InfiniteScroller;
