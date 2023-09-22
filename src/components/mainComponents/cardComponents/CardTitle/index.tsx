import { sliceStringAddElipsis } from "../../../../util/helpers/functions/titleAndByline/sliceStringAddElipsis";

interface AdjustedCardTitleProps {
    url: string;
    title: string;
}

const CardTitle = ({ url, title }: AdjustedCardTitleProps) => {
    const isTitleShort = title.length < 53;

    return (
        <h3>
            <a href={url} target="_blank" rel="noopener noreferrer">
                {isTitleShort ? title : sliceStringAddElipsis(title, 52)}
            </a>
        </h3>
    );
};

export default CardTitle;
