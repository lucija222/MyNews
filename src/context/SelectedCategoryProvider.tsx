import { createContext , useState, useEffect} from "react";

export const SelectedCategoryContext = createContext({
    selectedCategory: "home",
    setSelectedCategory: (categoryName: string) => {}
});

const SelectedCategoryProvider = ({children}: any) => {
    const [selectedCategory, setSelectedCategory] = useState("home");

    useEffect(() => {
        console.log("SCP context = ", selectedCategory);
    }, [selectedCategory])
    
    return (
        <SelectedCategoryContext.Provider value={{selectedCategory, setSelectedCategory}}>
            {children}
        </SelectedCategoryContext.Provider>
    );
};

export default SelectedCategoryProvider;