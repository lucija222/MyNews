import StringSlicer from "../../../util/helpers/functions/StringSlicer";
import "./CategoryCard.scss";

interface CategoryCardProps {
    imgSrc: string;
    category: string;
    title: string;
    author: string;
    url: string
}

const CategoryCard = ({
    imgSrc,
    category,
    title,
    author,
    url //Add url onClick
}: 
CategoryCardProps) => {
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
                    {category.toUpperCase()}
                </p>
                {title.length < 35 && (
                    <h3>
                        {title} <span className="shortStringFiller">{shortStringFiller}</span>
                    </h3>
                )}
                {title.length > 55 && <StringSlicer string={title} maxLength={55} asHTMLelement="h3" />}
                {(title.length >= 35) && (title.length <= 55) && <h3>{title}</h3>}
                <p className="author">{author}</p>
            </div>
        </>
    );
};

export default CategoryCard;
