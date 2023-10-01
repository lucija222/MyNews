import "./Nav.scss";
import { useContext, MouseEventHandler, } from "react";
import { ToggleMenuContext } from "../../../context/context";
import { CategoryUrlContext } from "../../../context/urlContexts/CategoryUrlProvider";
import { SetIsLoadingContext } from "../../../context/IsLoadingProvider";
import { IsFetchDataContext } from "../../../context/IsFetchDataProvider";
import { SelectedCategoryContext } from "../../../context/SelectedCategoryProvider";
import { FeaturedOrLatestStateContext } from "../../../context/FeaturedOrLatestTogglerProvider";
import {
    HomeSvg, GeneralSvg, BusinessSvg, HealthSvg, 
    ScienceSvg, SportsSvg, TechnologySvg, FavoritesSvg,
} from "../../../assets/svg/svgImports";

const Nav = () => {
    const { selectedCategory, setSelectedCategory, prevSelectedCategory } =
        useContext(SelectedCategoryContext);
    const { setIsMenuOpen, setIsHamburgerClicked } =
        useContext(ToggleMenuContext);
    const { featuredOrLatestState, setFeaturedOrLatestToggler } = useContext(
        FeaturedOrLatestStateContext
    );
    const { setIsFetchCategoryData, debounceFetch } = useContext(IsFetchDataContext);
    const { resetCardURLparams } = useContext(CategoryUrlContext);
    const { setIsCategoryLoading } = useContext(SetIsLoadingContext);

    const handleNavClick: MouseEventHandler<HTMLLIElement> = (e) => {
        e.stopPropagation();
        setIsMenuOpen(false);
        setIsHamburgerClicked(false);
        setSelectedCategory((prevCategory) => {
            prevSelectedCategory.current = prevCategory;
            return e.currentTarget.id;
        });

        debounceFetch(setIsFetchCategoryData);
        setIsCategoryLoading(true);
        resetCardURLparams(); 

        if (featuredOrLatestState === "Latest") {
            setFeaturedOrLatestToggler("Featured");
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

export default Nav;
