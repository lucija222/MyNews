import "./Header.scss";
import MainHeading from "../MainHeading";
import SearchFilter from "../SearchFilter";
import Menu from "../mobileComponents/Menu";
import Banner from "../bannerComponents/Banner";
import BannerModal from "../bannerComponents/BannerModal";
import { HamburgerSvg } from "../../../assets/svg/svgImports";
import { ViewportSizesContext } from "../../../context/ViewportSizesProvider";
import FeaturedOrWidgetToggler from "../mobileComponents/FeaturedOrWidgetToggler";
import { useState, MouseEventHandler, useContext, useEffect, memo } from "react";
import { allowOrDisableScroll } from "../../../util/helpers/functions/allowOrDisableScroll";
import { FeaturedOrLatestStateContext } from "../../../context/FeaturedOrLatestTogglerProvider";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBannerBtnClicked, setIsBannerBtnClicked] = useState(false);
    const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);

    const { isSmallViewport } = useContext(ViewportSizesContext);
    const { featuredOrLatestState } = useContext(FeaturedOrLatestStateContext);

    const handleMenuToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        setIsMenuOpen((prevState) => {
            return !prevState;
        });
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
        allowOrDisableScroll(isMenuOpen);
    }, [isMenuOpen]);

    useEffect(() => {
        allowOrDisableScroll(isBannerModalOpen);
    }, [isBannerModalOpen]);

    return (
        <>
            {!isSmallViewport && (
                <>
                    {!isBannerBtnClicked && (
                        <Banner handleBannerBtnClick={handleBannerBtnClick} />
                    )}

                    {isBannerModalOpen && (
                        <BannerModal setIsBannerModalOpen={setIsBannerModalOpen} />
                    )}
                </>
            )}

            <header>
                {!isMenuOpen && (
                    <div className="header-container">
                        <div>
                            <MainHeading />
                            {isSmallViewport && (
                                <button
                                    className="hamburger"
                                    aria-label="Open menu"
                                    onClick={handleMenuToggle}
                                >
                                    <HamburgerSvg />
                                </button>
                            )}
                        </div>
                        <SearchFilter />
                    </div>
                )}

                {isMenuOpen && isSmallViewport && (
                    <Menu
                        isMenuOpen={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                        handleMenuToggle={handleMenuToggle}
                    />
                )}

                {featuredOrLatestState !== "none" && (
                    <FeaturedOrWidgetToggler />
                )}
            </header>
        </>
    );
};

export default memo(Header);
