import {
    Dispatch, SetStateAction, createContext, useState, useRef, MutableRefObject, ReactNode,
} from "react";

interface ISelectedCategoryContext {
    selectedCategory: string;
    setSelectedCategory: Dispatch<SetStateAction<string>>;
    prevSelectedCategory: MutableRefObject<string>;
}

export const SelectedCategoryContext = createContext<ISelectedCategoryContext>({
    selectedCategory: "Home",
    setSelectedCategory: () => {},
    prevSelectedCategory: {current: ""}
});

const SelectedCategoryProvider = ({ children }: {children: ReactNode}) => {
    const [selectedCategory, setSelectedCategory] = useState("Home");
    const prevSelectedCategory = useRef("");

    return (
        <SelectedCategoryContext.Provider
            value={{ selectedCategory, setSelectedCategory, prevSelectedCategory }}
        >
            {children}
        </SelectedCategoryContext.Provider>
    );
};

export default SelectedCategoryProvider;