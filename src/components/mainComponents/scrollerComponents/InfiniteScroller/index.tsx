import { ArticleData } from "../../FetchData";
import RenderScroller from "../RenderScroller";
import { useRef, useEffect, useCallback } from "react";

interface InfiniteScrollerProps {
    isCategoryCard: boolean;
    isLoading: boolean;
    isFavoritesCategory: boolean;
    articleData: ArticleData;
    changeURLparams: () => void;
    isMaxFetchCalls: boolean;
}

const InfiniteScroller = ({
    isCategoryCard, isLoading, isFavoritesCategory,
    articleData, changeURLparams, isMaxFetchCalls
}: InfiniteScrollerProps) => {

    const observerRef = useRef<IntersectionObserver | null>(null);
    const observerElemRef = useRef<HTMLDivElement | null>(null);

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
