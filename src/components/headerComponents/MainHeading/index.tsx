import "./MainHeading.scss"
import { MouseEventHandler, useContext } from "react";
import { SelectedCategoryContext } from "../../../context/SelectedCategoryProvider";
import { SetIsLoadingContext } from "../../../context/IsLoadingProvider";

const MainHeading = () => {
    const { setSelectedCategory } = useContext(SelectedCategoryContext);
    const { setIsCategoryLoading, setIsWidgetLoading } = useContext(SetIsLoadingContext);

    const handleHeadingClick: MouseEventHandler<HTMLHeadingElement> = (e) => {
        e.stopPropagation();
        setSelectedCategory("Home");
        setIsCategoryLoading(true);
        setIsWidgetLoading(true);
    };

    return (
        <h1 className="mainHeading" onClick={handleHeadingClick}>
            <span>My</span>News
        </h1>
    );
};

export default MainHeading;
