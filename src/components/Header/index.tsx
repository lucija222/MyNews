import { useState, MouseEventHandler, useContext, useEffect } from "react";
import "./Header.scss";
import SearchFilter from "../SearchFilter";
import Menu from "../mobile-specific/Menu";
import { ToggleMenuContext } from "../../context/context";
import { IsDesktopViewportContext } from "../../context/IsDesktopViewportProvider";

const Header = () => {
    const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isDesktopViewport = useContext(IsDesktopViewportContext);

    const handleHamburgerClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        setIsHamburgerClicked(!isHamburgerClicked);
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClosingMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        setIsHamburgerClicked(!isHamburgerClicked);
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (isDesktopViewport) {
            setIsMenuOpen(false);
            setIsHamburgerClicked(false);
        }
    }, [isDesktopViewport]);

    return (
        <header>
            <div className="banner-container">
                <div className="banner-container__content">
                    <h2>Make MyNews your homepage</h2>
                    <p>Discover what's trending on the internet every day!</p>
                    <div className="banner-container__btns">
                        <button>GET</button>
                        <button>No, thanks</button>
                    </div>
                </div>
            </div>
            {!isHamburgerClicked && !isMenuOpen && (
                <div className="header-container">
                    <div>
                        <h1>
                            <span>My</span>News
                        </h1>
                        {!isDesktopViewport && (
                            <button
                                className="hamburger"
                                onClick={handleHamburgerClick}
                            >
                                <svg
                                    width="24"
                                    height="20"
                                    viewBox="0 0 24 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        width="24"
                                        height="4"
                                        rx="1"
                                        fill="#1D1D1B"
                                    />
                                    <rect
                                        y="8"
                                        width="24"
                                        height="4"
                                        rx="1"
                                        fill="#1D1D1B"
                                    />
                                    <rect
                                        y="16"
                                        width="24"
                                        height="4"
                                        rx="1"
                                        fill="#1D1D1B"
                                    />
                                </svg>
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
                        handleClosingMenu={handleClosingMenu}
                        menuFormClassName={"menuFormClassName"}
                    />
                </ToggleMenuContext.Provider>
            )}
        </header>
    );
};

export default Header;
