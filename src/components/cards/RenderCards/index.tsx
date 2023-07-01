import "./RenderCards.scss";
import WidgetCard from "../WidgetCard";
import CategoryCard from "../CategoryCard";
import {
    useContext,
    MutableRefObject,
} from "react";
import { ArticleData } from "../../InfiniteScroller";
import LatestNewsWidget from "../../LatestNewsWidget";
import { IsLargeViewportContext, IsMediumViewportContext, IsSmallViewportContext } from "../../../context/ViewportSizesProvider";

interface RenderCardsProps {
    cardClass: "category-card" | "widget-card";
    isCategoryCard: boolean;
    isWidgetCard: boolean;
    cardData: ArticleData;
    observerElemRef: MutableRefObject<HTMLDivElement | null>;
}

const RenderCards = ({
    cardClass,
    isCategoryCard,
    isWidgetCard,
    cardData,
    observerElemRef
}:
RenderCardsProps) => {
    const isSmallViewport = useContext(IsSmallViewportContext);
    const isMediumViewport = useContext(IsMediumViewportContext);
    const isLargeViewport = useContext(IsLargeViewportContext);

    const firstTwoCardsData = cardData.slice(0, 2);
    const firstFourCardsData = cardData.slice(0, 4);
    const mediumViewportRemainderCardData = cardData.slice(2);
    const largeViewportRemainderCardData = cardData.slice(4);

    return (
        <>
            {isSmallViewport && isCategoryCard && (
                    <div className="category-scroller_container">
                        {cardData.map((article, index) => {
                            return (
                                <article
                                    key={index}
                                    className={cardClass}
                                >
                                    <CategoryCard
                                        imgSrc={article.img_src}
                                        category={article.section}
                                        title={article.title}
                                        author={article.byline}
                                        url={article.url}
                                    />
                                </article>
                            );
                        })}
                        <div
                            ref={observerElemRef}
                            className="observerRef"
                        ></div>
                    </div>
            )}

            {isMediumViewport && isCategoryCard && (
                <div className="heading-and-scroller">
                    <h2 className="news-heading">News</h2>
                    <div className="category-scroller_container">
                        <div className="two-articles_container">
                            {firstTwoCardsData.map((article, index) => {
                                return (
                                    <article key={index} className={cardClass}>
                                        <CategoryCard
                                            imgSrc={article.img_src}
                                            category={article.section}
                                            title={article.title}
                                            author={article.byline}
                                            url={article.url}
                                        />
                                    </article>
                                );
                            })}
                        </div>
                        <LatestNewsWidget />
                        {mediumViewportRemainderCardData.map(
                            (article, index) => {
                                return (
                                    <article key={index} className={cardClass}>
                                        <CategoryCard
                                            imgSrc={article.img_src}
                                            category={article.section}
                                            title={article.title}
                                            author={article.byline}
                                            url={article.url}
                                        />
                                    </article>
                                );
                            }
                        )}
                        <div
                            ref={observerElemRef}
                            className="observerRef"
                        ></div>
                    </div>
                </div>
            )}

            {isLargeViewport && isCategoryCard && (
                <div className="heading-and-scroller">
                <h2 className="news-heading">News</h2>
                <div className="category-scroller_container">
                    <div className="four-articles_container">
                        {firstFourCardsData.map((article, index) => {
                            return (
                                <article key={index} className={cardClass}>
                                    <CategoryCard
                                        imgSrc={article.img_src}
                                        category={article.section}
                                        title={article.title}
                                        author={article.byline}
                                        url={article.url}
                                    />
                                </article>
                            );
                        })}
                    </div>
                    <LatestNewsWidget />
                    {largeViewportRemainderCardData.map((article, index) => {
                        return (
                            <article key={index} className={cardClass}>
                                <CategoryCard
                                    imgSrc={article.img_src}
                                    category={article.section}
                                    title={article.title}
                                    author={article.byline}
                                    url={article.url}
                                />
                            </article>
                        );
                    })}
                    <div ref={observerElemRef} className="observerRef"></div>
                </div>
                </div>
            )}

            {isWidgetCard && (
                <div className="widget-scroller_container">
                    {cardData.map((article, index) => {
                        return (
                            <article key={index} className={cardClass}>
                                <WidgetCard
                                    timestamp={article.timestamp}
                                    title={article.title}
                                    url={article.url}
                                />
                            </article>
                        );
                    })}
                    <div ref={observerElemRef} className="observerRef"></div>
                </div>
            )}
        </>
    );
};

export default RenderCards;
