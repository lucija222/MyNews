import "./RenderMain.scss";
import { useContext, useEffect, memo } from "react";
import Nav from "../../headerComponents/Nav";
import WidgetContainer from "../WidgetContainer";
import { ViewportSizesContext } from "../../../context/ViewportSizesProvider";
import FavoriteArticlesDataProvider from "../../../context/FavoriteArticlesDataProvider";
import { SetIsLoadingContext } from "../../../context/IsLoadingProvider";
import CategoryData from "../CategoryData";

interface NewsCategoryProps {
    isWidget: boolean;
}

const RenderMain = ({ isWidget }: NewsCategoryProps) => {
    const { isSmallViewport } = useContext(ViewportSizesContext);
    const { setIsCategoryLoading } = useContext(SetIsLoadingContext);

    useEffect(() => {
        setIsCategoryLoading(true);
    }, [setIsCategoryLoading]);
    
    return (
        <>
        <main className={isSmallViewport ? "main-flex" : "main-grid"}>
            <FavoriteArticlesDataProvider>
                    {!isSmallViewport && (
                        <>
                            <div className="main-grid__nav">
                                <Nav />
                            </div>
                            <h2 className="main-grid__heading">News</h2>
                        </>
                    )}

                    {isWidget ? (
                        <WidgetContainer />
                    ) : (
                        <CategoryData cardClass="category-card" />
                    )}
            </FavoriteArticlesDataProvider>
        </main>
        </>
    );
};

export default memo(RenderMain);
