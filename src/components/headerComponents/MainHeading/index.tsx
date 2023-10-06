import "./MainHeading.scss"
import { MouseEventHandler, useContext } from "react";
import { SelectedCategoryContext } from "../../../context/SelectedCategoryProvider";
import { IsFetchDataContext } from "../../../context/IsFetchDataProvider";

const MainHeading = () => {
    const { setSelectedCategory } = useContext(SelectedCategoryContext);
    const { setIsFetchCategoryData, debounceFetch } = useContext(IsFetchDataContext);

    const handleHeadingClick: MouseEventHandler<HTMLHeadingElement> = (e) => {
        e.stopPropagation();
        setSelectedCategory("Home");
        debounceFetch(setIsFetchCategoryData);
    };

    return (
        <h1 className="mainHeading" onClick={handleHeadingClick}>
            <span>My</span>News
        </h1>
    );
};

export default MainHeading;
