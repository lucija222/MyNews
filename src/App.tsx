import "./App.scss";
import Header from "./components/Header";
import NewsCategory from "./components/NewsCategory";
import LatestNewsWidget from "./components/LatestNewsWidget";
import { MouseEventHandler, useEffect, useContext } from "react";
import SelectedCategoryProvider from "./context/SelectedCategoryProvider";
import IsBannerRenderedProvider from "./context/IsBannerRenderedProvider";
import NumOfRenderedCardsProvider from "./context/NumOfRenderedCardsProvider";
import FeaturedOrWidgetToggler from "./components/mobile-specific/FeaturedOrWidgetToggler";
import { FeaturedOrLatestTogglerContext } from "./context/FeaturedOrLatestTogglerProvider";
import {
    IsSmallViewportContext,
    isBigViewportContext,
} from "./context/ViewportSizesProvider";

const App = () => {
    const { featuredOrLatestToggler, setFeaturedOrLatestToggler } = useContext(
        FeaturedOrLatestTogglerContext
    );
    const isSmallViewport = useContext(IsSmallViewportContext);
    const isBigViewport = useContext(isBigViewportContext);

    useEffect(() => {
        if (isBigViewport) {
            setFeaturedOrLatestToggler("none");
        } else if (isSmallViewport) {
            setFeaturedOrLatestToggler("Featured");
        }
    }, [isSmallViewport, isBigViewport, setFeaturedOrLatestToggler]);

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
            <NumOfRenderedCardsProvider>
                <IsBannerRenderedProvider>
                    <Header />
                    {featuredOrLatestToggler !== "none" && (
                        <FeaturedOrWidgetToggler
                            handleFeaturedOrLatestToggle={
                                handleFeaturedOrLatestToggle
                            }
                        />
                    )}
                    {(featuredOrLatestToggler === "Featured" ||
                        featuredOrLatestToggler === "none") && <NewsCategory />}
                    {featuredOrLatestToggler === "Latest" && (
                        <LatestNewsWidget />
                    )}
                </IsBannerRenderedProvider>
            </NumOfRenderedCardsProvider>
        </SelectedCategoryProvider>
    );
};

export default App;
