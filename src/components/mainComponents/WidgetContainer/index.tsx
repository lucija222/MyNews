import "./WidgetContainer.scss";
import FetchData from "../FetchData";
import { RedCircleSvg, RightArrowSvg } from "../../../assets/svg/svgImports";
import { useContext, useEffect } from "react";
import { SetIsLoadingContext } from "../../../context/IsLoadingProvider";

const WidgetContainer = () => {
    const { setIsWidgetLoading } = useContext(SetIsLoadingContext);

    useEffect(() => {
        setIsWidgetLoading(true);
    }, [setIsWidgetLoading]);

    return (
        <section className="widget-container" aria-hidden="true">
            <div className="latest-heading-container">
                <RedCircleSvg />
                <h2>Latest news</h2>
            </div>
            <FetchData cardClass="widget-card" />
            <div className="see-all-news">
                <a
                    href="https://www.nytimes.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}
                >
                    See all news
                </a>
                <RightArrowSvg />
            </div>
        </section>
    );
};

export default WidgetContainer;
