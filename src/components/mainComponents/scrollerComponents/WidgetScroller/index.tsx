import "./WidgetScroller.scss";
import { useContext, useEffect } from "react";
import { ArticleData } from "../../FetchAndFilterData";
import WidgetCard from "../../cardComponents/WidgetCard";
import {
    IsLoadingContext, SetIsLoadingContext,
} from "../../../../context/IsLoadingProvider";

interface WidgetScrollerProps {
    articleData: ArticleData;
    observerDiv?: JSX.Element | undefined;
}

const WidgetScroller = ({
    articleData,
    observerDiv,
}: WidgetScrollerProps) => {

    const { isWidgetLoading } = useContext(IsLoadingContext);
    const { setIsWidgetLoading } = useContext(SetIsLoadingContext);

    useEffect(() => {
        if (isWidgetLoading) {
            setIsWidgetLoading(false);
        }
    }, [isWidgetLoading]);

    return (
        <div className="widget-scroller_container">
            {articleData.map((article, index) => {
                return (
                    <article key={index} className="widget-card">
                        <WidgetCard
                            timestamp={article.timestamp}
                            title={article.title}
                            url={article.url}
                        />
                    </article>
                );
            })}
            {observerDiv}
        </div>
    );
};

export default WidgetScroller;
