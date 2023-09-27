import "./Menu.scss";
import Nav from "../../Nav";
import { MouseEvent } from "react";
import MainHeading from "../../MainHeading";
import SearchFilter from "../../SearchFilter";
import { XSvg } from "../../../../assets/svg/svgImports";

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
