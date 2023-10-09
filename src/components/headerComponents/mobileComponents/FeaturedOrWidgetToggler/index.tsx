import "./FeaturedOrWidgetToggler.scss";
import { MouseEventHandler, useContext, useRef } from "react";
import { SetIsLoadingContext } from "../../../../context/IsLoadingProvider";
import { FeaturedOrLatestStateContext } from "../../../../context/FeaturedOrLatestTogglerProvider";
import { CategoryUrlContext } from "../../../../context/urlContexts/CategoryUrlProvider";
import { WidgetUrlContext } from "../../../../context/urlContexts/WidgetUrlProvider";

const FeaturedOrWidgetToggler = () => {
    const { featuredOrLatestState, setFeaturedOrLatestToggler } = useContext(
        FeaturedOrLatestStateContext
    );
    const { resetCardURLparams } = useContext(CategoryUrlContext);
    const { resetWidgetURLparams } = useContext(WidgetUrlContext);
    const { setIsCategoryLoading, setIsWidgetLoading } = useContext(SetIsLoadingContext);
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
                setIsCategoryLoading(true);
                resetCardURLparams();
                return;

            } else if (targetInnerText === "Latest") {
                numOfClicksOnLatest.current += 1;

                if (numOfClicksOnLatest.current > 1) {
                    setIsWidgetLoading(true);
                    resetWidgetURLparams();
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
