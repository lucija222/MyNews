import { sliceString } from "../../../util/helpers/functions/stringSlicer";
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
            {title.length > 65 ? (
                <h3>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {sliceString(title, 65)}
                    </a>
                </h3>
            ) : (
                <h3>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                </h3>
            )}
        </>
    );
};

export default WidgetCard;
