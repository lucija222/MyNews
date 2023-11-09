import "./Nav.scss";
import { Dispatch, SetStateAction, useContext, MouseEventHandler, memo } from "react";
import { CategoryUrlContext } from "../../../context/urlContexts/CategoryUrlProvider";
import { SelectedCategoryContext } from "../../../context/SelectedCategoryProvider";
import { FeaturedOrLatestStateContext } from "../../../context/FeaturedOrLatestTogglerProvider";
import {
    HomeSvg, GeneralSvg, BusinessSvg, HealthSvg, 
    ScienceSvg, SportsSvg, TechnologySvg, FavoritesSvg,
} from "../../../assets/svg/svgImports";
import { SetIsLoadingContext } from "../../../context/IsLoadingProvider";

interface NavProps {
    setIsMenuOpen?: Dispatch<SetStateAction<boolean>>;
}

const Nav = ({ setIsMenuOpen }: NavProps) => {
    const { selectedCategory, setSelectedCategory, prevSelectedCategory } =
        useContext(SelectedCategoryContext);
    const { featuredOrLatestState, setFeaturedOrLatestState: setFeaturedOrLatestToggler } = useContext(
        FeaturedOrLatestStateContext
    );
    const { resetCardURLparams } = useContext(CategoryUrlContext);
    const { setIsCategoryLoading } = useContext(SetIsLoadingContext);

    const handleNavClick: MouseEventHandler<HTMLLIElement> = (e) => {
        e.stopPropagation();

        if (setIsMenuOpen) {
            setIsMenuOpen(false);
        }

        if (featuredOrLatestState === "Latest") {
            setFeaturedOrLatestToggler("Featured");
        }

        setSelectedCategory((prevCategory) => {
            prevSelectedCategory.current = prevCategory;
            return e.currentTarget.id;
        });

        if (prevSelectedCategory.current !== "Favorites")
        {
            resetCardURLparams();
            
        } else {
            setIsCategoryLoading(true);
        }
    };

    const svgComponentMap = {
        Home: <HomeSvg />,
        General: <GeneralSvg />,
        Business: <BusinessSvg />,
        Health: <HealthSvg />,
        Science: <ScienceSvg />,
        Sports: <SportsSvg />,
        Technology: <TechnologySvg />,
        Favorites: <FavoritesSvg />,
    };

    const returnLiElem = (category: keyof typeof svgComponentMap) => {
        return (
            <li
                id={category}
                onClick={handleNavClick}
                className={
                    selectedCategory === category ? `li selected-li` : "li"
                }
            >
                <a href="#top">
                    {svgComponentMap[category]}
                    <span>{category}</span>
                </a>
            </li>
        );
    };

    return (
        <nav className="general-nav">
            <ul>
                {returnLiElem("Home")}
                {returnLiElem("General")}
                {returnLiElem("Business")}
                {returnLiElem("Health")}
                {returnLiElem("Science")}
                {returnLiElem("Sports")}
                {returnLiElem("Technology")}
                {returnLiElem("Favorites")}
            </ul>
        </nav>
    );
};

export default memo(Nav);
