import "./HeartButton.scss";
import { MouseEventHandler, memo } from "react";

interface HeartButtonProps {
    handleFavoriteBtnClick: MouseEventHandler<HTMLButtonElement>;
    isArticleFavorite: boolean;
}

const HeartButton = ({
    handleFavoriteBtnClick,
    isArticleFavorite,
}: HeartButtonProps) => {
    return (
        <button
            type="button"
            className="heartBtn"
            aria-label="Save article to favorites"
            onClick={handleFavoriteBtnClick}
        >
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
    );
};

export default memo(HeartButton);
