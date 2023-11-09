import { memo } from "react";
import CardTitle from "../CardTitle";
import "./WidgetCard.scss";

interface WidgetCardProps {
    timestamp: string;
    title: string;
    url: string;
}

const WidgetCard = ({ timestamp, title, url }: WidgetCardProps) => {
    return (
        <>
            <time>{timestamp}</time>
            <CardTitle url={url} title={title} isWidgetCard={true}/>
        </>
    );
};

export default memo(WidgetCard);
