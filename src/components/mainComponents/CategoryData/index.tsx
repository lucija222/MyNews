import { useContext, memo } from "react";
import { IsLoadingContext, SetIsLoadingContext } from "../../../context/IsLoadingProvider";
import { CategoryUrlContext } from "../../../context/urlContexts/CategoryUrlProvider";
import FetchData from "../FetchData";

interface CategoryDataProps {
    cardClass: "category-card" | "widget-card";
}

const CategoryData = ({cardClass}: CategoryDataProps ) => {
    const { API_Card_URL, changeCardURLparams, isMaxCategoryFetchCalls, setTotalSearchResultsNum } = useContext(CategoryUrlContext);
    const { isCategoryLoading } = useContext(IsLoadingContext);
    const { setIsCategoryLoading } = useContext(SetIsLoadingContext);

    return (
        <FetchData cardClass={cardClass} URL={API_Card_URL} isLoading={isCategoryLoading} setIsLoading={setIsCategoryLoading} changeURLparams={changeCardURLparams} isMaxFetchCalls={isMaxCategoryFetchCalls} setTotalSearchResultsNum={setTotalSearchResultsNum}/>
    );
};

export default memo(CategoryData);