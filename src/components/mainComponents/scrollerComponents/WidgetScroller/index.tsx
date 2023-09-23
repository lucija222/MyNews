import "./WidgetScroller.scss";
import { ArticleData } from "../../FetchAndFilterData";
import WidgetCard from "../../cardComponents/WidgetCard";

interface WidgetScrollerProps {
    articleData: ArticleData;
    isAllDataRendered: boolean;
    observerDiv?: JSX.Element | undefined;
}

const WidgetScroller = ({
    articleData,
    isAllDataRendered,
    observerDiv,
}: WidgetScrollerProps) => {
    
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
            {!isAllDataRendered && observerDiv}
        </div>
    );
};

export default WidgetScroller;
