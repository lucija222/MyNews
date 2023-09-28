import "./RenderMain.scss";
import { useContext } from "react";
import FetchData from "../FetchData";
import Nav from "../../headerComponents/Nav";
import WidgetContainer from "../WidgetContainer";
import ApiURLProvider from "../../../context/ApiURLProvider";
import { ViewportSizesContext } from "../../../context/ViewportSizesProvider";
import FavoriteArticlesDataProvider from "../../../context/FavoriteArticlesDataProvider";

interface NewsCategoryProps {
    isWidget: boolean;
}

const RenderMain = ({ isWidget }: NewsCategoryProps) => {
    const { isSmallViewport } = useContext(ViewportSizesContext);

    return (
        <>
        <main className={isSmallViewport ? "main-flex" : "main-grid"}>
            <FavoriteArticlesDataProvider>
                <ApiURLProvider>

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
                        <FetchData cardClass="category-card" />
                    )}

                </ApiURLProvider>
            </FavoriteArticlesDataProvider>
        </main>
        </>
    );
};

export default RenderMain;
