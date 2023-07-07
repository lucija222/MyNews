import { sliceString } from "../../../util/helpers/functions/stringSlicer";
import AdjustTitleLength from "../AdjustTitleLength";
import "./BreakingNewsCard.scss";

interface BreakingNewsCardProps {
    title: string;
    byline: string;
    url: string;
}

const BreakingNewsCard = ({ title, byline, url }: BreakingNewsCardProps) => {
    return (
        <>
            <h4 className="breaking">BREAKING</h4>
            <h3 className="breaking-title">
                <AdjustTitleLength url={url} title={title} />
            </h3>
            <p className="breaking-author">
                {sliceString(byline, 40, "author")}
            </p>
        </>
    );
};

export default BreakingNewsCard;
