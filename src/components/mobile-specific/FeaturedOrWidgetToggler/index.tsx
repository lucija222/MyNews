import { MouseEvent } from "react";
import "./FeaturedOrWidgetToggler.scss";

interface FeaturedOrWidgetTogglerProps {
    featuredOrLatestToggler: string,
    handleFeaturedOrLatestToggle: (e: MouseEvent<HTMLDivElement>) => void
}

const FeaturedOrWidgetToggler = ({
    featuredOrLatestToggler,
    handleFeaturedOrLatestToggle,
}: FeaturedOrWidgetTogglerProps) => {

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
