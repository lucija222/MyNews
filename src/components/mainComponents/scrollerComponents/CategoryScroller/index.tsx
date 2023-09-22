import "./CategoryScroller.scss";
import { useContext } from "react";
import { ArticleData } from "../../FetchAndFilterData";
import WidgetContainer from "../../WidgetContainer";
import NoCardElems from "../../cardComponents/NoCardElems";
import CategoryCard from "../../cardComponents/CategoryCard";
import BreakingNewsCard from "../../cardComponents/BreakingNewsCard";
import { ViewportSizesContext } from "../../../../context/ViewportSizesProvider";
import { SelectedCategoryContext } from "../../../../context/SelectedCategoryProvider";
import { FavoriteArticlesDataContext } from "../../../../context/FavoriteArticlesDataProvider";

interface CategoryScrollerProps {
    cardClass: "category-card" | "widget-card";
    isFavoritesCategory: boolean;
    articleData: ArticleData;
    observerDiv?: JSX.Element | undefined;
}

const CategoryScroller = ({
    cardClass,
    isFavoritesCategory,
    articleData,
    observerDiv,
}: CategoryScrollerProps) => {

    const { selectedCategory } = useContext(SelectedCategoryContext);
    const { favoriteArticlesArray } = useContext(FavoriteArticlesDataContext);
    const { isSmallViewport, isMidViewport, isBigViewport } = useContext(ViewportSizesContext);

    const isSearchResultsCategory = selectedCategory === "searchResults";
    const isSearchCategoryNoResults =
        isSearchResultsCategory && articleData.length === 1;

    const isFavoriteOrSearchCategory =
        isFavoritesCategory || isSearchResultsCategory;
    const isFavoritesCategoryAndNoData =
        isFavoritesCategory && favoriteArticlesArray.length === 0;

    const returnCardElems = (data: ArticleData) => {
        if (isFavoritesCategoryAndNoData) {
            return <NoCardElems isNoFavorites={true} />;
        } else if (isSearchCategoryNoResults) {
            return <NoCardElems isNoFavorites={false} />;
        }

        return data.map((article, index) => {
            const isBreakingCard =
                (isMidViewport && index === 1) ||
                (isBigViewport && index === 3);

            if (!isFavoriteOrSearchCategory && isBreakingCard) {
                const articleIndex = articleData[index];
                return (
                    <article
                        key={index}
                        className={`${cardClass} breaking-news-card`}
                    >
                        <BreakingNewsCard
                            title={articleIndex.title}
                            byline={articleIndex.byline}
                            url={articleIndex.url}
                        />
                    </article>
                );
            } else {
                return (
                    <article key={index} className={cardClass}>
                        <CategoryCard index={index} {...article} />
                    </article>
                );
            }
        });
    };

    return (
        <div className="category-scroller__grid">
            {!isSmallViewport && !isFavoriteOrSearchCategory && (
                <WidgetContainer />
            )}

            {isFavoritesCategory
                ? returnCardElems(favoriteArticlesArray)
                : returnCardElems(articleData)}

            {(!isFavoritesCategory || isSearchCategoryNoResults) && observerDiv}
        </div>
    );
};

export default CategoryScroller;
