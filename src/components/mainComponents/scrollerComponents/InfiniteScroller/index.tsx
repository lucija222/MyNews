import RenderScroller from "../RenderScroller";
import { ArticleData } from "../../FetchData";
import { useRef, useEffect, useContext, useCallback } from "react";
import { ApiURLContext } from "../../../../context/ApiURLProvider";
import { SetIsLoadingContext } from "../../../../context/IsLoadingProvider";

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
        changeCardURLparams, changeWidgetURLparams,
        isMaxCategoryFetchCalls, isMaxWidgetFetchCalls
    } = useContext(ApiURLContext);
    const { setIsCategoryLoading, setIsWidgetLoading } =
    useContext(SetIsLoadingContext);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const observerElemRef = useRef<HTMLDivElement | null>(null);

    const changeURLparams = isCategoryCard
        ? changeCardURLparams
        : changeWidgetURLparams;
    const isMaxFetchCalls = isCategoryCard
        ? isMaxCategoryFetchCalls
        : isMaxWidgetFetchCalls;
    const setIsLoading = isCategoryCard
        ? setIsCategoryLoading
        : setIsWidgetLoading;

    const observerCallback = useCallback(
        ([entry]: IntersectionObserverEntry[]) => {
            if (entry.isIntersecting && !isLoading && !isMaxFetchCalls) {
                setIsLoading(true);
                changeURLparams();
            }
        },
        [isLoading, isMaxFetchCalls, setIsLoading, changeURLparams]
    );

    useEffect(() => {
        observerRef.current = new IntersectionObserver(observerCallback, {
            root: null,
            threshold: 0.5,
        });

        const observer = observerRef.current;
        const observerElem = observerElemRef.current;

        if (observerElem && observer && !isMaxFetchCalls) {
            observer.observe(observerElem);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [observerCallback, isMaxFetchCalls]);

    return (
        <>
            <RenderScroller
                isCategoryCard={isCategoryCard}
                isFavoritesCategory={isFavoritesCategory}
                articleData={articleData}
                observerElemRef={observerElemRef}
            />
        </>
    );
};

export default InfiniteScroller;
