import { ArticleData } from "../../../components/mainComponents/FetchAndFilterData";
import { NewDataArray } from "../../../typesAndInterfaces/apiTandI";
import { isDataFetchedOnCategoryChange } from "./isDataFetchedOnScroll";

export const replaceOrMergeArticleData = (
    prevData: ArticleData,
    cardClass: string,
    selectedCategory: string,
    isThereArticleData: boolean,
    filteredData: NewDataArray,
    URL: string
) => {

    let newData: ArticleData = [];

    switch (cardClass) {

        case "category-card":
            const shouldArticleDataBeReplaced = isDataFetchedOnCategoryChange(
                selectedCategory,
                URL
            );

            return newData = shouldArticleDataBeReplaced
                ? filteredData
                : [...prevData, ...filteredData];

        case "widget-card":

            return newData = isThereArticleData
                ? [...prevData, ...filteredData]
                : filteredData;
    }

    return newData;
};