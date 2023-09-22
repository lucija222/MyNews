import "./App.scss";
import { useEffect, useContext } from "react";
import Header from "./components/headerComponents/Header";
import NewsCategory from "./components/mainComponents/NewsCategory";
import { ViewportSizesContext } from "./context/ViewportSizesProvider";
import SelectedCategoryProvider from "./context/SelectedCategoryProvider";
import NumOfRenderedCardsProvider from "./context/NumOfRenderedCardsProvider";
import { FeaturedOrLatestStateContext } from "./context/FeaturedOrLatestTogglerProvider";
import EncodedSearchInputProvider from "./context/EncodedSearchInputProvider";
import IsFetchDataProvider from "./context/IsFetchDataProvider";

const App = () => {
    const { isSmallViewport } = useContext(ViewportSizesContext);
    const { featuredOrLatestState, setFeaturedOrLatestToggler } = useContext(
        FeaturedOrLatestStateContext
    );
    
    useEffect(() => {
        if (!isSmallViewport) {
            setFeaturedOrLatestToggler("none");
        } else if (isSmallViewport) {
            setFeaturedOrLatestToggler("Featured");
        }
    }, [isSmallViewport, setFeaturedOrLatestToggler]);

    return (
        <SelectedCategoryProvider>
            <EncodedSearchInputProvider>
                    <NumOfRenderedCardsProvider>
                        <IsFetchDataProvider>
                            <Header />
                            {(featuredOrLatestState === "Featured" ||
                                !isSmallViewport) && (
                                <NewsCategory isWidget={false} />
                            )}
                            {featuredOrLatestState === "Latest" && (
                                <NewsCategory isWidget={true} />
                            )}
                        </IsFetchDataProvider>
                    </NumOfRenderedCardsProvider>
            </EncodedSearchInputProvider>
        </SelectedCategoryProvider>
    );
};

export default App;
