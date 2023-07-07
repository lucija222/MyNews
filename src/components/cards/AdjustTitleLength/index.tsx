import { sliceString } from "../../../util/helpers/functions/stringSlicer";

interface AdjustTitleLengthProps {
    url: string;
    title: string;
}

const AdjustTitleLength = ({ url, title }: AdjustTitleLengthProps) => {
    const shortStringFiller = "xxx xxxx xxxx xxxx xxxxx xxxxx";

    return (
        <>
            {title.length < 42 ? (
                <>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                    <span className="shortStringFiller">
                        {shortStringFiller}
                    </span>
                </>
            ) : (
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {sliceString(title, 63)}
                </a>
            )}
        </>
    );
};

export default AdjustTitleLength;
