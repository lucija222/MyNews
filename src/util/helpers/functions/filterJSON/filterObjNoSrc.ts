import {
    FilteredArticleObject, NytArticleObj,
} from "../../../../typesAndInterfaces/apiTandI";
import { extractTime } from "../extractTime";

export const filterObjNoSrc = (
    articleObj: NytArticleObj,
    multimediaURL: string,
    isWidgetCard: boolean,
    selectedCategory: string,
) => {
    const correctCategorySection = () => {
        switch (selectedCategory) {
            case "searchResults":
                return "search result";
            
            case "General":
                return "General";
        
            default:
                return articleObj.section;
        }
    };

    switch (isWidgetCard) {
        case true:
            const filteredWidgetObj: FilteredArticleObject = {
                url: articleObj.url,
                title: articleObj.title,
                byline: articleObj.byline,
                section: "widget",
                timestamp: extractTime(articleObj.created_date),
                img_src: multimediaURL,
                img_objSrc: "",
                isFavorite: false,
            };

            return filteredWidgetObj;

        case false:
            const filteredCategoryObj: FilteredArticleObject = {
                url: articleObj.url,
                title: articleObj.title,
                byline: articleObj.byline,
                section: correctCategorySection(),
                timestamp: articleObj.created_date,
                img_src: multimediaURL,
                img_objSrc: "",
                isFavorite: false,
            };
            
            return filteredCategoryObj;
    }
};
