import { useState, MouseEventHandler } from "react";
import "./App.scss";
import Header from "./components/Header";
import NewsCategory from "./components/NewsCategory";
import SelectedCategoryProvider from "./context/SelectedCategoryProvider";
import FeaturedOrWidgetToggler from "./components/mobile-specific/FeaturedOrWidgetToggler";
import LatestNewsWidget from "./components/LatestNewsWidget";

function App() {
    const [featuredOrLatestToggler, setFeaturedOrLatestToggler] =
        useState("Featured");

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
            {featuredOrLatestToggler !== "none" && ( //TRACK VIEWPORT SIZE AND SET featuredOrLatestToggler TO *none* FOR DESKTOP
                <FeaturedOrWidgetToggler
                    featuredOrLatestToggler={featuredOrLatestToggler}
                    handleFeaturedOrLatestToggle={handleFeaturedOrLatestToggle}
                />
            )}
            {(featuredOrLatestToggler === "Featured") && <NewsCategory featuredOrLatestToggler={featuredOrLatestToggler}/>}
            {(featuredOrLatestToggler === "Latest") && <LatestNewsWidget />}
            {(featuredOrLatestToggler === "none") && <NewsCategory featuredOrLatestToggler={featuredOrLatestToggler}/> }
            </div>
        </SelectedCategoryProvider>
    );
}

export default App;
