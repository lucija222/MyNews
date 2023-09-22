import Nav from "../../Nav";
import SearchFilter from "../../SearchFilter";
import { MouseEvent } from "react";
import "./Menu.scss";
import { XSvg } from "../../../../assets/svg/svgImports";
import MainHeading from "../../MainHeading";

interface MenuProps {
    isMenuOpen: boolean;
    closeMenu: () => void;
    handleClosingMenu: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Menu = ({ isMenuOpen, closeMenu, handleClosingMenu }: MenuProps) => {
    return (
        <div className="menu-container">
            <button aria-label="Close menu" onClick={handleClosingMenu}>
                <XSvg />
            </button>
            <MainHeading />
            <SearchFilter isMenuOpen={isMenuOpen} closeMenu={closeMenu}/>
            <Nav />
        </div>
    );
};

export default Menu;
