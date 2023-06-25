import { useContext } from "react";
import LatestNewsWidget from "../LatestNewsWidget";
import { SelectedCategoryContext } from "../../context/SelectedCategoryProvider";
import "./NewsCategory.scss";
import { nytAPI_Key } from "../../util/helpers/constants";
import InfiniteScroller from "../InfiniteScroller";

interface NewsCategoryProps {
    featuredOrLatestToggler: "Featured" | "none";
}

const NewsCategory = ({ featuredOrLatestToggler }: NewsCategoryProps) => {
    const { selectedCategory } = useContext(SelectedCategoryContext);
    const nytAPI_URL =
        selectedCategory === "home"
            ? `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${nytAPI_Key}`
            : selectedCategory === "general"
            ? `https://api.nytimes.com/svc/news/v3/content/nyt/homepage.json?limit=100&offset=0&api-key=${nytAPI_Key}`
            : `https://api.nytimes.com/svc/news/v3/content/nyt/${selectedCategory}.json?limit=100&offset=0&api-key=${nytAPI_Key}`;

    return (
        <main className="news-container">
            <h2 className="news-heading">News</h2>
            {featuredOrLatestToggler === "none" && <LatestNewsWidget />}
            <InfiniteScroller
                URL={nytAPI_URL}
                cardClass="category-card"
                containerName="category-scroller_container"
            />
        </main>
    );
};

export default NewsCategory;
