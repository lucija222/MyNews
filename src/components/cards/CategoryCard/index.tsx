import "./CategoryCard.scss";
import { sliceString } from "../../../util/helpers/functions/stringSlicer";

interface CategoryCardProps {
    imgSrc: string;
    category: string;
    title: string;
    author: string;
    url: string;
};

const CategoryCard = ({
    imgSrc,
    category,
    title,
    author,
    url
}: CategoryCardProps) => {

    const shortStringFiller = "xxx xxxx xxxx xxxx xxxxx xxxxx";

    return (
        <>
            <div className="img_container">
                <img
                    src={imgSrc}
                    alt="Article related photograph"
                    className="category-card__img"
                />
            </div>
            <div className="category-card__text-content">
                <p className="category-card__category">
                    {category}
                </p>
                {title.length < 42 && (
                    <h3>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                        </a>
                        <span className="shortStringFiller">
                            {shortStringFiller}
                        </span>
                    </h3>
                )}
                {title.length > 70 && (
                    <h3>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                        {sliceString(title, 70)}
                        </a>
                    </h3>
                )}
                {title.length >= 42 && title.length <= 70 && (
                    <h3>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                        </a>
                    </h3>
                )}
                <p className="author">{sliceString(author, 40, "author")}</p>
            </div>
        </>
    );
};

export default CategoryCard;
