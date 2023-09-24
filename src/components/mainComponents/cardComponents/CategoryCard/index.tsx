import "./CategoryCard.scss";
import CardTitle from "../CardTitle";
import CardByline from "../CardByline";
import HeartButton from "../HeartButton";
import { useState, MouseEventHandler, useContext, useEffect, ReactEventHandler, } from "react";
import { FavoriteArticlesDataContext } from "../../../../context/FavoriteArticlesDataProvider";

interface CategoryCardProps {
    url: string;
    title: string;
    byline: string;
    section: string;
    timestamp: string;
    img_src: string;
    isFavorite: boolean;
    index: number;
}

const CategoryCard = ({ index, ...article }: CategoryCardProps) => {
    const { url, title, byline, section, timestamp, img_src, isFavorite } =
        article;
    const [isArticleFavorite, setIsArticleFavorite] = useState(
        isFavorite ? isFavorite : false
    );
    const { favoriteArticlesArray, updateFavoriteArticlesArray } = useContext(
        FavoriteArticlesDataContext
    );

    const isCardAD = index ? index % 6 === 0 : false;

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

    const handleImageError: ReactEventHandler<HTMLImageElement> = (e) => {
        e.stopPropagation();
        const target = e.target as HTMLImageElement;
        target.src = "./images/onErrorImgURL.png";
    };

    const correctCategoryName = () => {
        return isArticleFavorite
            ? "favorite"
            : isCardAD
            ? "programmatic/native ad"
            : section;
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
                    key={img_src}
                    loading="eager"
                    onError={handleImageError}
                    alt="Article related photograph"
                />
            </div>
            <div className="category-card__text-content">
                <p>
                    {correctCategoryName()}
                </p>
                <CardTitle url={url} title={title} />
                <CardByline byline={byline} />
            </div>
            <HeartButton
                handleFavoriteBtnClick={handleFavoriteBtnClick}
                isArticleFavorite={isArticleFavorite}
            />
        </>
    );
};

export default CategoryCard;
