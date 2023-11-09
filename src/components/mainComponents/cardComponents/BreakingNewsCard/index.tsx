import { memo } from "react";
import "./BreakingNewsCard.scss";
import CardByline from "../CardByline";
import CardTitle from "../CardTitle";

interface BreakingNewsCardProps {
    title: string;
    byline: string;
    url: string;
};

const BreakingNewsCard = ({ title, byline, url }: BreakingNewsCardProps) => {
    return (
        <>
            <h4>BREAKING</h4>
            <CardTitle url={url} title={title} isWidgetCard={false}/>
            <CardByline byline={byline} />
        </>
    );
};

export default memo(BreakingNewsCard);
