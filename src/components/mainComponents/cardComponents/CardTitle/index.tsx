import { memo } from "react";
import { sliceStringAddElipsis } from "../../../../util/helpers/functions/titleAndByline/sliceStringAddElipsis";

interface AdjustedCardTitleProps {
    url: string;
    title: string;
    isWidgetCard: boolean;
}

const CardTitle = ({ url, title, isWidgetCard }: AdjustedCardTitleProps) => {
    const isTitleShort = title.length < 53;

    return (
        <h3>
            <a href={url} target="_blank" rel="noopener noreferrer" tabIndex={isWidgetCard ? -1 : 0}>
                {isTitleShort ? title : sliceStringAddElipsis(title, 52)}
            </a>
        </h3>
    );
};

export default memo(CardTitle);
