import "./WidgetContainer.scss";
import WidgetData from "../WidgetData";
import { useContext, useEffect, memo } from "react";
import { SetIsLoadingContext } from "../../../context/IsLoadingProvider";
import { RedCircleSvg, RightArrowSvg } from "../../../assets/svg/svgImports";

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
             <WidgetData cardClass="widget-card" setIsWidgetLoading={setIsWidgetLoading}/>
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

export default memo(WidgetContainer);
