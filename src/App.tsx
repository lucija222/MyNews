import "./App.scss";
import Header from "./components/Header";
import NewsCategory from "./components/NewsCategory";
import { MouseEventHandler, useEffect, useContext } from "react";
import SelectedCategoryProvider from "./context/SelectedCategoryProvider";
import FeaturedOrWidgetToggler from "./components/mobile-specific/FeaturedOrWidgetToggler";
import LatestNewsWidget from "./components/LatestNewsWidget";
import { IsDesktopViewportContext } from "./context/IsDesktopViewportProvider";
import { FeaturedOrLatestTogglerContext } from "./context/FeaturedOrLatestTogglerProvider";

const App = () => {
    const { featuredOrLatestToggler, setFeaturedOrLatestToggler } = useContext(
        FeaturedOrLatestTogglerContext
    );
    const isDesktopViewport = useContext(IsDesktopViewportContext);

    useEffect(() => {
        if (isDesktopViewport) {
            setFeaturedOrLatestToggler("none");
        } else if (!isDesktopViewport) {
            setFeaturedOrLatestToggler("Featured");
        }
    }, [isDesktopViewport, setFeaturedOrLatestToggler]);

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
                        handleFeaturedOrLatestToggle={
                            handleFeaturedOrLatestToggle
                        }
                    />
                )}
                {featuredOrLatestToggler === "Featured" && <NewsCategory />}
                {featuredOrLatestToggler === "Latest" && <LatestNewsWidget />}
                {featuredOrLatestToggler === "none" && <NewsCategory />}
        </SelectedCategoryProvider>
    );
};

export default App;
