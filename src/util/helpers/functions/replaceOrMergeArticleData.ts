import { ArticleData } from "../../../components/mainComponents/FetchData";
import { NewDataArray } from "../../../typesAndInterfaces/apiTandI";
import { isDataFetchedOnCategoryChange } from "./isDataFetchedOnCategoryChange";

export const replaceOrMergeArticleData = (
    prevData: ArticleData,
    cardClass: string,
    selectedCategory: string,
    isThereArticleData: boolean,
    filteredData: NewDataArray,
    url: string
) => {

    let newData: ArticleData = [];

    switch (cardClass) {

        case "category-card":
            const shouldArticleDataBeReplaced = isDataFetchedOnCategoryChange(
                selectedCategory,
                url
            );
            
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

            return newData = isThereArticleData
                ? [...prevData, ...filteredData]
                : filteredData;
    }

    return newData;
};