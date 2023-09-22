import CardByline from "../CardByline";
import CardTitle from "../CardTitle";
import "./BreakingNewsCard.scss";

interface BreakingNewsCardProps {
    title: string;
    byline: string;
    url: string;
};

const BreakingNewsCard = ({ title, byline, url }: BreakingNewsCardProps) => {
    return (
        <>
            <h4>BREAKING</h4>
            <CardTitle url={url} title={title} />
            <CardByline byline={byline} />
        </>
    );
};

export default BreakingNewsCard;
