import { createContext , useState, PropsWithChildren} from "react";

export const SelectedCategoryContext = createContext<{
    selectedCategory: string,
    setSelectedCategory: (
        stringOrCallback: string | ((prevIndex: string) => string)
    ) => void;
}>({
    selectedCategory: "home",
    setSelectedCategory: () => {}
});

const SelectedCategoryProvider = ({children}: PropsWithChildren) => {
    const [selectedCategory, setSelectedCategory] = useState("home");
    
    return (
        <SelectedCategoryContext.Provider value={{selectedCategory, setSelectedCategory}}>
            {children}
        </SelectedCategoryContext.Provider>
    );
};

export default SelectedCategoryProvider;