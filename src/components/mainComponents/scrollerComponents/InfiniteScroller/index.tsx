import { ArticleData } from "../../FetchData";
import RenderScroller from "../RenderScroller";
import { useRef, useEffect, useContext, useCallback } from "react";
import { WidgetUrlContext } from "../../../../context/urlContexts/WidgetUrlProvider";
import { CategoryUrlContext } from "../../../../context/urlContexts/CategoryUrlProvider";

interface InfiniteScrollerProps {
    isCategoryCard: boolean;
    isLoading: boolean;
    isFavoritesCategory: boolean;
    articleData: ArticleData;
}

const InfiniteScroller = ({
    isCategoryCard,
    isLoading,
    isFavoritesCategory,
    articleData,
}: InfiniteScrollerProps) => {
    const { changeCardURLparams, isMaxCategoryFetchCalls } =
        useContext(CategoryUrlContext);
    const { changeWidgetURLparams, isMaxWidgetFetchCalls } =
        useContext(WidgetUrlContext);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const observerElemRef = useRef<HTMLDivElement | null>(null);

    const changeURLparams = isCategoryCard
        ? changeCardURLparams
        : changeWidgetURLparams;
    const isMaxFetchCalls = isCategoryCard
        ? isMaxCategoryFetchCalls
        : isMaxWidgetFetchCalls;

    const observerCallback = useCallback(
        ([entry]: IntersectionObserverEntry[]) => {
            if (entry.isIntersecting && !isLoading && !isMaxFetchCalls) {
                changeURLparams();
            }
        },
        [isLoading, isMaxFetchCalls, changeURLparams]
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
        <RenderScroller
            isCategoryCard={isCategoryCard}
            isFavoritesCategory={isFavoritesCategory}
            articleData={articleData}
            observerElemRef={observerElemRef}
        />
    );
};

export default InfiniteScroller;
