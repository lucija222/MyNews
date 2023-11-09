import "./CategoryScroller.scss";
import { ArticleData } from "../../FetchData";
import WidgetContainer from "../../WidgetContainer";
import { useContext, useEffect, memo } from "react";
import NoCardElems from "../../cardComponents/NoCardElems";
import CategoryCard from "../../cardComponents/CategoryCard";
import BreakingNewsCard from "../../cardComponents/BreakingNewsCard";
import { ViewportSizesContext } from "../../../../context/ViewportSizesProvider";
import { SelectedCategoryContext } from "../../../../context/SelectedCategoryProvider";
import { FavoriteArticlesDataContext } from "../../../../context/FavoriteArticlesDataProvider";
import { IsLoadingContext, SetIsLoadingContext } from "../../../../context/IsLoadingProvider";

interface CategoryScrollerProps {
    isFavoritesCategory: boolean;
    articleData: ArticleData;
    observerDiv: JSX.Element | undefined;
}

const CategoryScroller = ({
    isFavoritesCategory, articleData, observerDiv,
}: CategoryScrollerProps) => {

    const { selectedCategory } = useContext(SelectedCategoryContext);
    const { favoriteArticlesArray } = useContext(FavoriteArticlesDataContext);
    const { isSmallViewport, isMidViewport, isBigViewport } = useContext(ViewportSizesContext);
    const { isCategoryLoading } = useContext(IsLoadingContext);
    const { setIsCategoryLoading } = useContext(SetIsLoadingContext);

    const isSearchCategory = selectedCategory === "searchResults";
    const isSearchNoResults = isSearchCategory && articleData.length === 0;

    const isFavoriteOrSearchCategory = isFavoritesCategory || isSearchCategory;
    const isFavoritesNoData = isFavoritesCategory && favoriteArticlesArray.length === 0;
    const dataLength = articleData.length - 1;


    const returnCardElems = (data: ArticleData) => {
        console.log();
        
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
                return (
                    <article
                    key={`${index}-${article.title}`}
                        className="category-card breaking-news-card"
                    >
                        <BreakingNewsCard
                            title={article.title}
                            byline={article.byline}
                            url={article.url}
                        />
                    </article>
                );

            } else if (!isFavoritesCategory && dataLength === index) {
                return (
                    <article key={`${index}-${article.title}`} className="category-card">
                        <CategoryCard index={index} isFavoritesCategory={isFavoritesCategory} {...article} />
                        {observerDiv}
                    </article>
                );

            } else {
                return (
                    <article key={`${index}-${article.title}`} className="category-card">
                        <CategoryCard index={index} isFavoritesCategory={isFavoritesCategory} {...article} />
                    </article>
                );
            }
        });
    };

    useEffect(() => {
        if (isCategoryLoading && selectedCategory === "Favorites") {
            setTimeout(() => {
                setIsCategoryLoading(false);
            }, 1000);
        }
    });

    return (
        <div className="category-scroller__grid">
            {!isSmallViewport && !isFavoriteOrSearchCategory && <WidgetContainer />}

            {isFavoritesCategory
                ? returnCardElems(favoriteArticlesArray)
                : returnCardElems(articleData)}
        </div>
    );
};

export default memo(CategoryScroller);
