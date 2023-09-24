import "./RenderScroller.scss";
import { ArticleData } from "../../FetchAndFilterData";
import { MutableRefObject } from "react";
import WidgetScroller from "../WidgetScroller";
import CategoryScroller from "../CategoryScroller";

interface RenderScrollerProps {
    isCategoryCard: boolean;
    isFavoritesCategory: boolean;
    articleData: ArticleData;
    observerElemRef?: MutableRefObject<HTMLDivElement | null>;
}

const RenderScroller = ({
    isCategoryCard,
    isFavoritesCategory,
    articleData,
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
                        observerDiv={observerDiv}
                    />
                </>
            )}

            {!isCategoryCard && isThereArticleData && (
                <WidgetScroller
                    articleData={articleData}
                    observerDiv={observerDiv}
                />
            )}
        </>
    );
};

export default RenderScroller;
