import LatestNewsWidget from "../LatestNewsWidget";
import "./NewsCategory.scss";

interface NewsCategoryProps {
    featuredOrLatestToggler: "Featured" | "none"
}

const NewsCategory = ({featuredOrLatestToggler}: NewsCategoryProps) => {

    return (
        <main className="news-container">
            <h2 className="news-heading">News</h2>
            {/* Add infinite scroller and render card components in it */}
            {(featuredOrLatestToggler === "none") && <LatestNewsWidget />}
        </main>
    );
};

export default NewsCategory;