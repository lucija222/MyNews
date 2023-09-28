import { ArticleData } from "../../../components/mainComponents/FetchData";
import { NewDataArray } from "../../../typesAndInterfaces/apiTandI";
import { isDataFetchedOnCategoryChange } from "./isDataFetchedOnScroll";

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
                if (prevData) {
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