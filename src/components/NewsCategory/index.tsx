import Nav from "../Nav";
import "./NewsCategory.scss";
import { useContext } from "react";
import InfiniteScroller from "../InfiniteScroller";
import { nytAPI_Key } from "../../util/helpers/constants";
import { SelectedCategoryContext } from "../../context/SelectedCategoryProvider";
import { IsLargeViewportContext, IsMediumViewportContext } from "../../context/ViewportSizesProvider";

const NewsCategory = () => {
    const { selectedCategory } = useContext(SelectedCategoryContext);
    const isMediumViewport = useContext(IsMediumViewportContext);
    const isLargeViewport = useContext(IsLargeViewportContext);
    const nytAPI_URL =
        selectedCategory === "home"
            ? `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${nytAPI_Key}`
            : selectedCategory === "general"
            ? `https://api.nytimes.com/svc/news/v3/content/nyt/homepage.json?limit=100&offset=0&api-key=${nytAPI_Key}`
            : `https://api.nytimes.com/svc/news/v3/content/nyt/${selectedCategory}.json?limit=100&offset=0&api-key=${nytAPI_Key}`;

            // useEffect(() => {
            //     console.log("LARGE:", isLargeViewport, ", MEDIUM:", isMediumViewport);
                
            // }, [isLargeViewport, isMediumViewport]);

    return (
        <main className="news-container">
              {(isMediumViewport || isLargeViewport) && (
                    <Nav />
            )}
            <InfiniteScroller
                URL={nytAPI_URL}
                cardClass="category-card"
            />
        </main>
    );
};

export default NewsCategory;