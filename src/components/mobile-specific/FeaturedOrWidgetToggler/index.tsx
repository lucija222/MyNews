import { MouseEvent, useContext } from "react";
import "./FeaturedOrWidgetToggler.scss";
import { FeaturedOrLatestTogglerContext } from "../../../context/FeaturedOrLatestTogglerProvider";

interface FeaturedOrWidgetTogglerProps {
    handleFeaturedOrLatestToggle: (e: MouseEvent<HTMLDivElement>) => void;
};

const FeaturedOrWidgetToggler = ({ handleFeaturedOrLatestToggle }: FeaturedOrWidgetTogglerProps) => {
    const { featuredOrLatestToggler } = useContext(FeaturedOrLatestTogglerContext);

    return (
        <div
            onClick={handleFeaturedOrLatestToggle}
            className="toggler-contaier"
        >
            <h2
                className={
                    featuredOrLatestToggler === "Featured"
                        ? "selected-mobile-toggler"
                        : "mobile-toggler"
                }
            >
                Featured
            </h2>
            <h2
                className={
                    featuredOrLatestToggler === "Latest"
                        ? "selected-mobile-toggler"
                        : "mobile-toggler"
                }
            >
                Latest
            </h2>
        </div>
    );
};

export default FeaturedOrWidgetToggler;
