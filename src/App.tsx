import { useState, MouseEventHandler, useEffect, useContext } from "react";
import Header from "./components/Header";
import NewsCategory from "./components/NewsCategory";
import SelectedCategoryProvider from "./context/SelectedCategoryProvider";
import FeaturedOrWidgetToggler from "./components/mobile-specific/FeaturedOrWidgetToggler";
import LatestNewsWidget from "./components/LatestNewsWidget";
import { IsDesktopViewportContext } from "./context/IsDesktopViewportProvider";
import "./App.scss";

const App = () => {
    const [featuredOrLatestToggler, setFeaturedOrLatestToggler] =
        useState("Featured");
    const isDesktopViewport = useContext(IsDesktopViewportContext);

    useEffect(() => {
        if (isDesktopViewport) {
            setFeaturedOrLatestToggler("none");
        } else if (!isDesktopViewport) {
            setFeaturedOrLatestToggler("Featured");
        }
    }, [isDesktopViewport]);

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
            <div className="app-container">
                {featuredOrLatestToggler !== "none" && (
                    <FeaturedOrWidgetToggler
                        featuredOrLatestToggler={featuredOrLatestToggler}
                        handleFeaturedOrLatestToggle={
                            handleFeaturedOrLatestToggle
                        }
                    />
                )}
                {featuredOrLatestToggler === "Featured" && (
                    <NewsCategory
                        featuredOrLatestToggler={featuredOrLatestToggler}
                    />
                )}
                {featuredOrLatestToggler === "Latest" && <LatestNewsWidget />}
                {featuredOrLatestToggler === "none" && (
                    <NewsCategory
                        featuredOrLatestToggler={featuredOrLatestToggler}
                    />
                )}
            </div>
        </SelectedCategoryProvider>
    );
}

export default App;
