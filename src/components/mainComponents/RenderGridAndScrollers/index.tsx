import "./RenderGridAndScrollers.scss";
import Nav from "../../headerComponents/Nav";
import WidgetScroller from "../scrollerComponents/WidgetScroller";
import CategoryScroller from "../scrollerComponents/CategoryScroller";
import { ArticleData } from "../FetchAndFilterData";
import { MutableRefObject, useContext } from "react";
import { ViewportSizesContext } from "../../../context/ViewportSizesProvider";

interface RenderCardsProps {
    cardClass: "category-card" | "widget-card";
    isFavoritesCategory: boolean;
    articleData: ArticleData;
    observerElemRef?: MutableRefObject<HTMLDivElement | null>;
}

const RenderGridAndScrollers = ({
    cardClass,
    isFavoritesCategory,
    articleData,
    observerElemRef,
}: RenderCardsProps) => {
    const { isSmallViewport } = useContext(ViewportSizesContext);

    const isCategoryCard = cardClass === "category-card";
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
                        cardClass={cardClass}
                        isFavoritesCategory={isFavoritesCategory}
                        articleData={articleData}
                        observerDiv={observerDiv}
                    />
                </>
            )}

            {!isCategoryCard && isThereArticleData && (
                <WidgetScroller
                    articleData={articleData}
                    cardClass={cardClass}
                    observerDiv={observerDiv}
                />
            )}
        </>
    );
};

export default RenderGridAndScrollers;
