import "./App.scss";
import { useEffect, useContext } from "react";
import ContextProviders from "./context/ContextProviders";
import Header from "./components/headerComponents/Header";
import RenderMain from "./components/mainComponents/RenderMain";
import { ViewportSizesContext } from "./context/ViewportSizesProvider";
import { FeaturedOrLatestStateContext } from "./context/FeaturedOrLatestTogglerProvider";

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
        <ContextProviders>
            <Header />
            {(featuredOrLatestState === "Featured" || !isSmallViewport) && (
                <RenderMain isWidget={false} />
            )}
            {featuredOrLatestState === "Latest" && (
                <RenderMain isWidget={true} />
            )}
        </ContextProviders>
    );
};

export default App;
