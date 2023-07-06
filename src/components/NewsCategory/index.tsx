import "./NewsCategory.scss";
import { useContext } from "react";
import CardData from "../cards/CardData";
import { nytAPI_Key } from "../../util/helpers/constants";
import { SelectedCategoryContext } from "../../context/SelectedCategoryProvider";
import FavoriteArticlesDataProvider from "../../context/FavoriteArticlesDataProvider";

const NewsCategory = () => {
    const { selectedCategory } = useContext(SelectedCategoryContext);
    const isFavoritesCategory = selectedCategory === "favorites";
    const nytAPI_URL = selectedCategory === "home"
            ? `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${nytAPI_Key}`
            : selectedCategory === "general"
            ? `https://api.nytimes.com/svc/news/v3/content/nyt/homepage.json?limit=100&offset=0&api-key=${nytAPI_Key}`
            : selectedCategory === "favorites"
            ? ""
            : `https://api.nytimes.com/svc/news/v3/content/nyt/${selectedCategory}.json?limit=100&offset=0&api-key=${nytAPI_Key}`;

    return (
        <main className="news-container">
            <FavoriteArticlesDataProvider>
                <CardData
                    URL={nytAPI_URL}
                    cardClass="category-card"
                    isFavoritesCategory={isFavoritesCategory}
                />
            </FavoriteArticlesDataProvider>
        </main>
    );
};

export default NewsCategory;
