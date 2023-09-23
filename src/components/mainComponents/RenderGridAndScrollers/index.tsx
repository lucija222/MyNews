import "./RenderGridAndScrollers.scss";
import Nav from "../../headerComponents/Nav";
import { ArticleData } from "../FetchAndFilterData";
import { MutableRefObject, useContext } from "react";
import WidgetScroller from "../scrollerComponents/WidgetScroller";
import CategoryScroller from "../scrollerComponents/CategoryScroller";
import { ViewportSizesContext } from "../../../context/ViewportSizesProvider";

interface RenderCardsProps {
    isCategoryCard: boolean;
    isFavoritesCategory: boolean;
    articleData: ArticleData;
    isAllDataRendered: boolean;
    observerElemRef?: MutableRefObject<HTMLDivElement | null>;
}

const RenderGridAndScrollers = ({
    isCategoryCard,
    isFavoritesCategory,
    articleData,
    isAllDataRendered,
    observerElemRef,
}: RenderCardsProps) => {
    const { isSmallViewport } = useContext(ViewportSizesContext);

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
                    {!isSmallViewport && (
                        <>
                            <div className="main-grid__nav">
                                <Nav />
                            </div>
                            <h2 className="main-grid__heading">News</h2>
                        </>
                    )}

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

export default RenderGridAndScrollers;
