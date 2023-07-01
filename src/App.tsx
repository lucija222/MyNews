import "./App.scss";
import Header from "./components/Header";
import NewsCategory from "./components/NewsCategory";
import { MouseEventHandler, useEffect, useContext } from "react";
import SelectedCategoryProvider from "./context/SelectedCategoryProvider";
import FeaturedOrWidgetToggler from "./components/mobile-specific/FeaturedOrWidgetToggler";
import LatestNewsWidget from "./components/LatestNewsWidget";
import { FeaturedOrLatestTogglerContext } from "./context/FeaturedOrLatestTogglerProvider";
import { IsLargeViewportContext, IsMediumViewportContext, IsSmallViewportContext } from "./context/ViewportSizesProvider";
const App = () => {
    const { featuredOrLatestToggler, setFeaturedOrLatestToggler } = useContext(
        FeaturedOrLatestTogglerContext
    );
    const isSmallViewport = useContext(IsSmallViewportContext);
    const isMediumViewport = useContext(IsMediumViewportContext);
    const isLargeViewport = useContext(IsLargeViewportContext);

    useEffect(() => {
        if (isMediumViewport || isLargeViewport) {
            setFeaturedOrLatestToggler("none");
        } else if (isSmallViewport) {
            setFeaturedOrLatestToggler("Featured");
        }
    }, [isSmallViewport, isMediumViewport, isLargeViewport, setFeaturedOrLatestToggler]);

    const handleFeaturedOrLatestToggle: MouseEventHandler<HTMLDivElement> = (
        e
    ) => {
        e.stopPropagation();
        const target = e.target as HTMLHeadingElement;
        if (target.innerText !== featuredOrLatestToggler) {
            setFeaturedOrLatestToggler(target.innerText);
        }
    };

    return (
        <SelectedCategoryProvider>
            <Header />
            {featuredOrLatestToggler !== "none" && (
                <FeaturedOrWidgetToggler
                    handleFeaturedOrLatestToggle={handleFeaturedOrLatestToggle}
                />
            )}
            {featuredOrLatestToggler === "Featured" && <NewsCategory />}
            {featuredOrLatestToggler === "Latest" && <LatestNewsWidget />}
            {featuredOrLatestToggler === "none" && <NewsCategory />}
        </SelectedCategoryProvider>
    );
};

export default App;
