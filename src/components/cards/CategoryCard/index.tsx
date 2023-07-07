import "./CategoryCard.scss";
import { useState, MouseEventHandler, useContext, useEffect } from "react";
import { sliceString } from "../../../util/helpers/functions/stringSlicer";
import { FavoriteArticlesDataContext } from "../../../context/FavoriteArticlesDataProvider";
import AdjustTitleLength from "../AdjustTitleLength";

interface CategoryCardProps {
    img_src: string;
    section: string;
    title: string;
    byline: string;
    url: string;
    timestamp: string;
    isFavorite: boolean;
    index?: number;
}

const CategoryCard = (props: CategoryCardProps) => {
    const {
        img_src,
        section,
        title,
        byline,
        url,
        timestamp,
        isFavorite,
        index,
    } = props;
    const [isArticleFavorite, setIsArticleFavorite] = useState(
        isFavorite ? isFavorite : false
    );
    const { favoriteArticlesArray, updateFavoriteArticlesArray } = useContext(
        FavoriteArticlesDataContext
    );
    const isCardAD = index ? (index + 1) % 6 === 0 : false;

    const handleFavoriteBtnClick: MouseEventHandler<HTMLButtonElement> = (
        e
    ) => {
        e.stopPropagation();
        const newIsArticleFavorite = !isArticleFavorite;
        const favoriteArticleObject = {
            url: url,
            title: title,
            byline: byline,
            section: section,
            timestamp: timestamp,
            img_src: img_src,
            isFavorite: newIsArticleFavorite,
        };
        updateFavoriteArticlesArray(
            favoriteArticleObject,
            newIsArticleFavorite
        );
        setIsArticleFavorite(newIsArticleFavorite);
    };

    useEffect(() => {
        const isAlreadyInFavorites = favoriteArticlesArray.some((article) => {
            return article.url === url;
        });
        if (isAlreadyInFavorites !== isArticleFavorite) {
            setIsArticleFavorite(isAlreadyInFavorites);
        }
    }, [favoriteArticlesArray, url, isArticleFavorite]);

    return (
        <>
            {isCardAD && <p className="ad">AD</p>}
            <div className="img_container">
                <img
                    src={img_src}
                    alt="Article related photograph"
                    className="category-card__img"
                />
            </div>
            <div className="category-card__text-content">
                <p className="category-card__category">
                    {isArticleFavorite
                        ? "favorite"
                        : isCardAD
                        ? "programmatic/native ad"
                        : section}
                </p>
                <h3>
                    <AdjustTitleLength url={url} title={title} />
                </h3>
                <p className="author">{sliceString(byline, 40, "author")}</p>
            </div>
            <button type="button" onClick={handleFavoriteBtnClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={isArticleFavorite ? "#bb1e1e" : "none"}
                    stroke={isArticleFavorite ? "none" : "#bb1e1e"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
        </>
    );
};

export default CategoryCard;
