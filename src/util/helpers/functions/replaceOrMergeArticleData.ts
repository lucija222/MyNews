import { ArticleData } from "../../../components/mainComponents/FetchData";
import { NewDataArray } from "../../../typesAndInterfaces/apiTandI";
import { isDataFetchedOnCategoryChange } from "./isDataFetchedOnCategoryChange";

export const replaceOrMergeArticleData = (
    prevData: ArticleData,
    cardClass: string,
    selectedCategory: string,
    filteredData: NewDataArray,
    url: string
) => {

    let newData: ArticleData = [];

    const shouldArticleDataBeReplaced = isDataFetchedOnCategoryChange(
        selectedCategory,
        url
    );

    switch (cardClass) {

        case "category-card":

            if (shouldArticleDataBeReplaced) {
                if (prevData.length > 0) {
                    for (const articleObj of prevData) {
                        URL.revokeObjectURL(articleObj.img_src);
                    }
                }
                return newData = filteredData;
            }
            
            return newData = [...prevData, ...filteredData];

        case "widget-card":

            return newData = shouldArticleDataBeReplaced
                ? filteredData
                : [...prevData, ...filteredData];
    }

    return newData;
};