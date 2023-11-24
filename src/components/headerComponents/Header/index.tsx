import "./Header.scss";
import { HamburgerSvg } from "../../../assets/svg/svgImports";
import { ViewportSizesContext } from "../../../context/ViewportSizesProvider";
import FeaturedOrWidgetToggler from "../mobileComponents/FeaturedOrWidgetToggler";
import { useState, MouseEventHandler, useContext, useEffect, memo } from "react";
import { Banner, BannerModal, MainHeading, Menu, SearchFilter } from "../headerImports";
import { allowOrDisableScroll } from "../../../util/helpers/functions/allowOrDisableScroll";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBannerBtnClicked, setIsBannerBtnClicked] = useState(false);
    const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
    const { isSmallViewport } = useContext(ViewportSizesContext);

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

                 {isSmallViewport && (

                    <>
                    {isMenuOpen && (
                        <Menu
                        isMenuOpen={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                        handleMenuToggle={handleMenuToggle}
                    />
                    )}

                    <FeaturedOrWidgetToggler />
                    </>
                )}
            </header>
        </>
    );
};

export default memo(Header);
