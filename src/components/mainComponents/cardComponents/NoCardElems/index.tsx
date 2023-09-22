import { ViewportSizesContext } from "../../../../context/ViewportSizesProvider";
import { useContext } from "react";
import "./NoCardElems.scss";

interface NoCardElemsProps {
    isNoFavorites: boolean;
}

const NoCardElems = ({ isNoFavorites }: NoCardElemsProps) => {
    const { isSmallViewport } = useContext(ViewportSizesContext);
    const noSearchResults = "No matches found";

    const noFavorites = () => {
        const smallNoFavorites =
            "There are currently no favorite articles. Explore the news and \u2764 your favorites to save them!";
        const bigNoFavorites = (
            <>
                There are currently no favorite articles.
                <br />
                Explore the news and &#10084; your favorites to save them!
            </>
        );

        if (isSmallViewport) {
            return smallNoFavorites;
        }

        return bigNoFavorites;
    };

    return (
        <div className="no-card-elems">
            {isNoFavorites ? noFavorites() : noSearchResults}
        </div>
    );
};

export default NoCardElems;
