import "./FeaturedOrWidgetToggler.scss";
import { MouseEventHandler, useContext, useRef } from "react";
import { FeaturedOrLatestStateContext } from "../../../../context/FeaturedOrLatestTogglerProvider";
import { IsFetchDataContext } from "../../../../context/IsFetchDataProvider";

const FeaturedOrWidgetToggler = () => {
    const { featuredOrLatestState, setFeaturedOrLatestToggler } = useContext(
        FeaturedOrLatestStateContext
    );
    const { setIsFetchCategoryData, setIsFetchWidgetData } =
        useContext(IsFetchDataContext);
    const numOfClicksOnLatest = useRef(0);

    const handleFeaturedOrLatestToggle: MouseEventHandler<HTMLButtonElement> = (
        e
    ) => {
        e.stopPropagation();
        const target = e.target as HTMLHeadingElement;
        const targetInnerText = target.innerText;

        if (targetInnerText !== featuredOrLatestState) {
            setFeaturedOrLatestToggler(target.innerText);

            if (targetInnerText === "Featured") {
                setIsFetchCategoryData(true);

                return;
            } else if (targetInnerText === "Latest") {
                numOfClicksOnLatest.current += 1;
                console.log(numOfClicksOnLatest.current);

                if (numOfClicksOnLatest.current > 1) {
                    setIsFetchWidgetData(true);
                }
            }
        }
    };

    return (
        <div className="toggler-contaier">
            <button
                className={
                    featuredOrLatestState === "Featured"
                        ? "selected-mobile-toggler"
                        : "mobile-toggler"
                }
                onClick={handleFeaturedOrLatestToggle}
            >
                Featured
            </button>
            <button
                className={
                    featuredOrLatestState === "Latest"
                        ? "selected-mobile-toggler"
                        : "mobile-toggler"
                }
                onClick={handleFeaturedOrLatestToggle}
            >
                Latest
            </button>
        </div>
    );
};

export default FeaturedOrWidgetToggler;
