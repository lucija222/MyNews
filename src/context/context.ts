import { createContext } from "react";

export const ToggleMenuContext = createContext({
    setIsMenuOpen: (isMenuOpen: boolean) => {},
    setIsHamburgerClicked: (isMenuOpen: boolean) => {}
});