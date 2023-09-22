import "./NewsCategory.scss";
import { useContext } from "react";
import WidgetContainer from "../WidgetContainer";
import FetchAndFilterData from "../FetchAndFilterData";
import ApiURLProvider from "../../../context/ApiURLProvider";
import { ViewportSizesContext } from "../../../context/ViewportSizesProvider";
import FavoriteArticlesDataProvider from "../../../context/FavoriteArticlesDataProvider";

interface NewsCategoryProps {
    isWidget: boolean;
}

const NewsCategory = ({ isWidget }: NewsCategoryProps) => {
    const { isSmallViewport } = useContext(ViewportSizesContext);

    return (
        <main className={isSmallViewport ? "main-flex" : "main-grid"}>
            <FavoriteArticlesDataProvider>
                <ApiURLProvider>
                    {isWidget ? (
                        <WidgetContainer />
                    ) : (
                        <FetchAndFilterData cardClass="category-card" />
                    )}
                </ApiURLProvider>
            </FavoriteArticlesDataProvider>
        </main>
    );
};

export default NewsCategory;
