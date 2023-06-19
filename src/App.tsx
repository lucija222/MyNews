import "./App.scss";
import Header from "./components/Header";
import NewsCategory from "./components/NewsCategory";
import SelectedCategoryProvider from "./context/SelectedCategoryProvider";

function App() {
    return (
        <SelectedCategoryProvider>
            <Header />
            <NewsCategory />
        </SelectedCategoryProvider>
    );
}

export default App;
