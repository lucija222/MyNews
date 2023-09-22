import { removeByFromByline } from "../../../../util/helpers/functions/titleAndByline/removeByFromByline";
import { sliceStrRemoveByAddElipsis } from "../../../../util/helpers/functions/titleAndByline/sliceStrRemoveByAddElipsis";

interface CardBylineProps {
    byline: string;
};

const CardByline = ({ byline }: CardBylineProps) => {
    const isBylineShort = byline.length < 41;

    return (
        <p>
            {isBylineShort
                ? removeByFromByline(byline)
                : sliceStrRemoveByAddElipsis(byline, 40)}
        </p>
    );
};

export default CardByline;
