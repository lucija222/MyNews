import { isValidString } from "./isValidString";
import { getDataArrWithImgObjUrl } from "./getDataArrWithImgObjUrl";
import { authorStringsToCheck, imgStringsToCheck } from "../../constants";
import {
    FilteredArticleObject, NewDataArray, NewsApiArticleObj,
} from "../../../../typesAndInterfaces/apiTandI";

export const filterNewsApiJson = async (jsonData: any) => {
    const filteredArray_NoObjSrc: NewDataArray = [];

    if (jsonData.totalResults === 0) {
        return filteredArray_NoObjSrc;
    }

    const articlesArr: [NewsApiArticleObj] = jsonData.articles;
    const pendingFetches: Promise<Response>[] = [];

    for (const articleObj of articlesArr) {
        if (
            isValidString(articleObj.author, authorStringsToCheck) &&
            isValidString(articleObj.urlToImage, imgStringsToCheck)
        ) {
            pendingFetches.push(fetch(`//wsrv.nl/?url=${articleObj.urlToImage}&w=345`));

            const filteredObj: FilteredArticleObject = {
                url: articleObj.url,
                title: articleObj.title,
                byline: articleObj.author,
                section: "search result",
                timestamp: articleObj.publishedAt,
                img_src: articleObj.urlToImage,
                img_objSrc: "",
                isFavorite: false,
            };

            filteredArray_NoObjSrc.push(filteredObj);
        }
    }
    const completeArray = await getDataArrWithImgObjUrl(pendingFetches, filteredArray_NoObjSrc);

    return completeArray;
};