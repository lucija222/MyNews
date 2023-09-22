import { Dispatch, SetStateAction, createContext } from "react";

export const ToggleMenuContext = createContext<{
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>,
    setIsHamburgerClicked: Dispatch<SetStateAction<boolean>>

}>({
    setIsMenuOpen: () => {},
    setIsHamburgerClicked: () => {}
});