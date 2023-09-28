import "./Header.scss";
import MainHeading from "../MainHeading";
import SearchFilter from "../SearchFilter";
import Menu from "../mobileComponents/Menu";
import Banner from "../bannerComponents/Banner";
import BannerModal from "../bannerComponents/BannerModal";
import { ToggleMenuContext } from "../../../context/context";
import { HamburgerSvg } from "../../../assets/svg/svgImports";
import { useState, MouseEventHandler, useContext, useEffect } from "react";
import { ViewportSizesContext } from "../../../context/ViewportSizesProvider";
import { allowOrDisableScroll } from "../../../util/helpers/functions/allowOrDisableScroll";
import { FeaturedOrLatestStateContext } from "../../../context/FeaturedOrLatestTogglerProvider";
import FeaturedOrWidgetToggler from "../mobileComponents/FeaturedOrWidgetToggler";

const Header = () => {
    const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBannerBtnClicked, setIsBannerBtnClicked] = useState(false);
    const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);

    const { isSmallViewport } = useContext(ViewportSizesContext);
    const { featuredOrLatestState } = useContext(FeaturedOrLatestStateContext);

    const handleHamburgerClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        setIsHamburgerClicked(!isHamburgerClicked);
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsHamburgerClicked(!isHamburgerClicked);
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClosingMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        closeMenu();
    };

    const handleBannerBtnClick: MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();
        setIsBannerBtnClicked(true);
        const target = e.target as HTMLButtonElement;
        
        if (target.innerText === "GET") {
            setIsBannerModalOpen(true);
        }
    };

    useEffect(() => {
        if (!isSmallViewport) {
            setIsMenuOpen(false);
            setIsHamburgerClicked(false);
        }
    }, [isSmallViewport]);

    useEffect(() => {
        allowOrDisableScroll(isMenuOpen);
    }, [isMenuOpen]);
    
    useEffect(() => {
        allowOrDisableScroll(isBannerModalOpen);
    }, [isBannerModalOpen]);

    return (
        <>
            {!isSmallViewport && !isBannerBtnClicked && (
                <Banner handleBannerBtnClick={handleBannerBtnClick}/>
            )}

            {!isSmallViewport && isBannerModalOpen && <BannerModal setIsBannerModalOpen={setIsBannerModalOpen} />} 

            <header className={!isSmallViewport ? "header-pseudoelem" : ""}>
                {!isHamburgerClicked && !isMenuOpen && (
                    <div className="header-container">
                        <div>
                            <MainHeading />
                            {isSmallViewport && (
                                <button
                                    className="hamburger"
                                    aria-label="Open menu"
                                    onClick={handleHamburgerClick}
                                >
                                    <HamburgerSvg />
                                </button>
                            )}
                        </div>
                        <SearchFilter />
                    </div>
                )}

                {isHamburgerClicked && isMenuOpen && (
                    <ToggleMenuContext.Provider
                        value={{ setIsMenuOpen, setIsHamburgerClicked }}
                    >
                        <Menu
                            isMenuOpen={isMenuOpen}
                            closeMenu={closeMenu}
                            handleClosingMenu={handleClosingMenu}
                        />
                    </ToggleMenuContext.Provider>
                )}
                
                {featuredOrLatestState !== "none" && (
                    <FeaturedOrWidgetToggler />
                )}
            </header>
        </>
    );
};

export default Header;
