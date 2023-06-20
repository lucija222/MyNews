import Nav from "../Nav";
import SearchFilter from "../SearchFilter";
import { MouseEvent } from "react";
import "./Menu.scss";

interface MenuProps {
    handleClosingMenu: (e: MouseEvent<HTMLButtonElement>) => void,
    formClassName: string,
};

const Menu = ({ handleClosingMenu, formClassName }: MenuProps) => {
    return (
        <div className="menu-container">
            <button onClick={handleClosingMenu}>
                <svg
                    width="19.8"
                    height="19.8"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        x="2.82843"
                        width="24"
                        height="4"
                        rx="1"
                        transform="rotate(45 2.82843 0)"
                        fill="#1D1D1B"
                    />
                    <rect
                        y="16.9706"
                        width="24"
                        height="4"
                        rx="1"
                        transform="rotate(-45 0 16.9706)"
                        fill="#1D1D1B"
                    />
                </svg>
            </button>
            <h1 className="menu-heading">
                <span>My</span>News
            </h1>
            <SearchFilter formClassName={formClassName}/>
            <Nav />
        </div>
    );
};

export default Menu;
