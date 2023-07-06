import "./Header.scss";
import SearchFilter from "../SearchFilter";
import Menu from "../mobile-specific/Menu";
import { ToggleMenuContext } from "../../context/context";
import {
    useState,
    MouseEventHandler,
    useContext,
    useEffect,
    useRef,
} from "react";
import {

    IsSmallViewportContext, isBigViewportContext,
} from "../../context/ViewportSizesProvider";
import { IsBannerRenderedContext } from "../../context/IsBannerRenderedProvider";

const Header = () => {
    const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBannerBtnClicked, setIsBannerBtnClicked] = useState(false);

    const isSmallViewport = useContext(IsSmallViewportContext);
    const isBigViewport = useContext(isBigViewportContext);
    const {setIsBannerRendered} = useContext(IsBannerRenderedContext);

    const bannerRef = useRef<HTMLDivElement | null>(null);

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

    const handleBannerBtnClick: MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();
        setIsBannerBtnClicked(true);
        setIsBannerRendered(false);
    };

    useEffect(() => {
        if (isBigViewport) {
            setIsMenuOpen(false);
            setIsHamburgerClicked(false);
        }
    }, [isBigViewport]);

    useEffect(() => {
        const body = document.body;
        if (isMenuOpen) {
            body.classList.replace("allow-scroll", "disable-scroll");
        } else if (!isMenuOpen) {
            body.classList.replace("disable-scroll", "allow-scroll");
        }
    }, [isMenuOpen]);

    return (
        <>
            <header
                className={
                    isBigViewport
                        ? "header-pseudoelem"
                        : ""
                }
            >
                {isBigViewport &&
                    !isBannerBtnClicked && (
                        <div className="banner-container">
                            <div
                                ref={bannerRef}
                                className="banner-container__content"
                            >
                                <h2>Make MyNews your homepage</h2>
                                <p className="banner-p">
                                    Discover what's trending on the internet
                                    every day!
                                </p>
                                <div
                                    className="banner-container__btns"
                                    onClick={handleBannerBtnClick}
                                >
                                    <button>GET</button>
                                    <button>No, thanks</button>
                                </div>
                            </div>
                        </div>
                    )}
                {!isHamburgerClicked && !isMenuOpen && (
                    <div className="header-container">
                        <div>
                            <h1>
                                <span>My</span>News
                            </h1>
                            {isSmallViewport && (
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
        </>
    );
};

export default Header;
