import { createContext } from "react";

type setStateBoolean = (
    booleanOrCallback: boolean | ((prevIndex: boolean) => boolean)
) => void;

export const ToggleMenuContext = createContext<{
    setIsMenuOpen: setStateBoolean,
    setIsHamburgerClicked: setStateBoolean
}>({
    setIsMenuOpen: () => {},
    setIsHamburgerClicked: () => {}
});