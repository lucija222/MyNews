import "./RenderScroller.scss";
import { ArticleData } from "../../FetchAndFilterData";
import { MutableRefObject } from "react";
import WidgetScroller from "../WidgetScroller";
import CategoryScroller from "../CategoryScroller";

interface RenderScrollerProps {
    isCategoryCard: boolean;
    isFavoritesCategory: boolean;
    articleData: ArticleData;
    isAllDataRendered: boolean;
    observerElemRef?: MutableRefObject<HTMLDivElement | null>;
}

const RenderScroller = ({
    isCategoryCard,
    isFavoritesCategory,
    articleData,
    isAllDataRendered,
    observerElemRef,
}: RenderScrollerProps) => {
    const isThereArticleData = articleData.length > 1;
    const observerDiv = observerElemRef && (
        <div
            ref={(elem) => (observerElemRef!.current = elem)}
            className="observerRef"
        ></div>
    );

    return (
        <>
            {isCategoryCard && (
                <>
                    <CategoryScroller
                        isFavoritesCategory={isFavoritesCategory}
                        articleData={articleData}
                        isAllDataRendered={isAllDataRendered}
                        observerDiv={observerDiv}
                    />
                </>
            )}

            {!isCategoryCard && isThereArticleData && (
                <WidgetScroller
                    articleData={articleData}
                    isAllDataRendered={isAllDataRendered}
                    observerDiv={observerDiv}
                />
            )}
        </>
    );
};

export default RenderScroller;
