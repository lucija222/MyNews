import "./WidgetScroller.scss";
import { ArticleData } from "../../FetchAndFilterData";
import WidgetCard from "../../cardComponents/WidgetCard";

interface WidgetScrollerProps {
    articleData: ArticleData;
    cardClass: "category-card" | "widget-card";
    observerDiv?: JSX.Element | undefined;
}

const WidgetScroller = ({
    articleData,
    cardClass,
    observerDiv,
}: WidgetScrollerProps) => {
    
    return (
        <div className="widget-scroller_container">
            {articleData.map((article, index) => {
                return (
                    <article key={index} className={cardClass}>
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
