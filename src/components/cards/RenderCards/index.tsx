import "./RenderCards.scss";
import Nav from "../../Nav";
import { ArticleData } from "../CardData";
import WidgetCard from "../WidgetCard";
import CategoryCard from "../CategoryCard";
import { useContext, MutableRefObject } from "react";
import LatestNewsWidget from "../../LatestNewsWidget";
import {
    IsSmallViewportContext,
    isBigViewportContext,
} from "../../../context/ViewportSizesProvider";
import { IsBannerRenderedContext } from "../../../context/IsBannerRenderedProvider";

interface RenderCardsProps {
    cardClass: "category-card" | "widget-card";
    isFavoritesCategory: boolean;
    cardData: ArticleData;
    observerElemRef?: MutableRefObject<HTMLDivElement | null>;
}

const RenderCards = ({
    cardClass,
    isFavoritesCategory,
    cardData,
    observerElemRef,
}: RenderCardsProps) => {
    const isSmallViewport = useContext(IsSmallViewportContext);
    const isBigViewport = useContext(isBigViewportContext);
    const { isBannerRendered } = useContext(IsBannerRenderedContext);
    const isCategoryCard = cardClass === "category-card";
    const isCardDataEmpty = cardData.length === 0;
    // const breakingCardData = cardData[0];
    // const slicedCardData = cardData.slice(1);

    return (
        <>
            {isSmallViewport && isCategoryCard && (
                <div className="category-scroller_container">
                    {isFavoritesCategory && isCardDataEmpty && (
                        <div className="no-favorites-mobile">
                            <p>
                                You currently have no favorite articles. Explore
                                the news and &#10084; your favorites to save
                                them!
                            </p>
                        </div>
                    )}
                    {cardData.map((article, index) => {
                        return (
                            <article key={index} className={cardClass}>
                                <CategoryCard {...article} />
                            </article>
                        );
                    })}
                    {!isFavoritesCategory && (
                        <div
                            ref={observerElemRef}
                            className="observerRef"
                        ></div>
                    )}
                </div>
            )}

            {isBigViewport && isCategoryCard && (
                <div className="main-grid">
                    <div
                        className={
                            isBannerRendered
                                ? "main-grid__nav banner-rendered"
                                : "main-grid__nav banner-not-rendered"
                        }
                    >
                        <Nav />
                    </div>
                    <div
                        className={
                            isBannerRendered
                                ? "main-grid__heading banner-rendered"
                                : "main-grid__heading banner-not-rendered"
                        }
                    >
                        <h2 className="news-heading">News</h2>
                    </div>
                    <div className="main-grid__div3">
                        <div className="category-scroller__grid">
                            {!isFavoritesCategory && <LatestNewsWidget />}
                            {isFavoritesCategory && isCardDataEmpty && (
                                <div className="no-favorites-desktop">
                                    <p>
                                        You currently have no favorite articles.
                                        Explore the news and &#10084; your
                                        favorites to save them!
                                    </p>
                                </div>
                            )}
                            {cardData.map((article, index) => {
                                return (
                                    <article key={index} className={index === 4 ? `${cardClass} breaking-news-card` : cardClass}>
                                        <CategoryCard {...article} index={index}/>
                                    </article>
                                );
                            })}
                            {!isFavoritesCategory && (
                                <div
                                    ref={observerElemRef}
                                    className="observerRef"
                                ></div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {!isCategoryCard && (
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
