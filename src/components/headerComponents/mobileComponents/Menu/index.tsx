import "./Menu.scss";
import Nav from "../../Nav";
import { Dispatch, SetStateAction, MouseEvent } from "react";
import MainHeading from "../../MainHeading";
import SearchFilter from "../../SearchFilter";
import { XSvg } from "../../../../assets/svg/svgImports";

interface MenuProps {
    isMenuOpen: boolean;
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>
    handleMenuToggle: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Menu = ({ isMenuOpen, setIsMenuOpen, handleMenuToggle }: MenuProps) => {
    return (
        <div className="menu-container">
            <button aria-label="Close menu" onClick={handleMenuToggle}>
                <XSvg />
            </button>
            <MainHeading />
            <SearchFilter isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
            <Nav setIsMenuOpen={setIsMenuOpen}/>
        </div>
    );
};

export default Menu;
