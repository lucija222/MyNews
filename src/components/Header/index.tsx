import { useState, MouseEventHandler } from "react";
import "./Header.scss";
import SearchFilter from "../SearchFilter";
import Menu from "../Menu";
import { ToggleMenuContext } from "../../context/context";

const Header = () => {
    const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    return (
        <header>
            <div className="banner-container">
                <h2>Make MyNews your homepage</h2>
                <p>Discover what's trending on the internet every day!</p>
                <div className="banner-container_btns">
                    <button>GET</button>
                    <button>No, thanks</button>
                </div>
            </div>
            {!isHamburgerClicked && !isMenuOpen && (
                <div className="header-container">
                    <div>
                        <h1>
                            <span>My</span>News
                        </h1>
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
                        formClassName={"formClassName"}
                    />
                </ToggleMenuContext.Provider>
            )}
        </header>
    );
};

export default Header;
