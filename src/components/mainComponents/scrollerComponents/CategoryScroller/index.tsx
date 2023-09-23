import "./CategoryScroller.scss";
import { useContext } from "react";
import WidgetContainer from "../../WidgetContainer";
import { ArticleData } from "../../FetchAndFilterData";
import NoCardElems from "../../cardComponents/NoCardElems";
import CategoryCard from "../../cardComponents/CategoryCard";
import BreakingNewsCard from "../../cardComponents/BreakingNewsCard";
import { ViewportSizesContext } from "../../../../context/ViewportSizesProvider";
import { SelectedCategoryContext } from "../../../../context/SelectedCategoryProvider";
import { FavoriteArticlesDataContext } from "../../../../context/FavoriteArticlesDataProvider";

interface CategoryScrollerProps {
    isFavoritesCategory: boolean;
    articleData: ArticleData;
    isAllDataRendered: boolean;
    observerDiv?: JSX.Element | undefined;
}

const CategoryScroller = ({
    isFavoritesCategory, articleData, isAllDataRendered, observerDiv,
}: CategoryScrollerProps) => {

    const { selectedCategory } = useContext(SelectedCategoryContext);
    const { favoriteArticlesArray } = useContext(FavoriteArticlesDataContext);
    const { isSmallViewport, isMidViewport, isBigViewport } = useContext(ViewportSizesContext);

    const isSearchCategory = selectedCategory === "searchResults";
    const isSearchNoResults = isSearchCategory && articleData.length === 1;

    const isFavoriteOrSearchCategory = isFavoritesCategory || isSearchCategory;
    const isFavoritesNoData = isFavoritesCategory && favoriteArticlesArray.length === 0;

    const shouldObserverElemRender = () => {
        if (isAllDataRendered || isSearchCategory || isFavoritesCategory) {
            console.log("***NO OBSERVER ELEM RENDERED");
            return;
        }
        
        return observerDiv;
    };

    const returnCardElems = (data: ArticleData) => {
        if (isFavoritesNoData) {
            return <NoCardElems isNoFavorites={true} />;
        } else if (isSearchNoResults) {
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
                        className="category-card breaking-news-card"
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
                    <article key={index} className="category-card">
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

            {shouldObserverElemRender()}
        </div>
    );
};

export default CategoryScroller;
