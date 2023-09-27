import {
    FilteredArticleObject, NewDataArray, NewsApiArticleObj,
} from "../../../../typesAndInterfaces/apiTandI";
import { isValidString } from "./doesStringInclude";
import { getDataArrWithImgObjUrl } from "./getDataArrWithImgObjUrl";

export const filterNewsApiJson = async (jsonData: any) => {
    const filteredArray_NoObjSrc: NewDataArray = [];

    if (jsonData.totalResults === 0) {
        const noResultsObj = {
            url: "",
            title: "No matches found",
            byline: "",
            section: "search result",
            timestamp: "",
            img_src: "",
            img_objSrc: "",
            isFavorite: false,
        };
        filteredArray_NoObjSrc.push(noResultsObj);
        return filteredArray_NoObjSrc;
    }

    const articlesArr: [NewsApiArticleObj] = jsonData.articles;
    const pendingFetches: Promise<Response>[] = [];
    const authorStringsToCheck = [".com", "@"];
    const imgStringsToCheck = [
        "biztoc", "boingboing.net", "cnet.com", "cdn01.dailycaller", 
        "i.cbc.ca", "ladbible.com", "//time.com", "i0.wp.com"
    ];


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