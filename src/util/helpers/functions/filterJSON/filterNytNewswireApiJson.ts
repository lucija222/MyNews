import {
    FilteredArticleObject,
    NytMultimediaObj,
    NewDataArray,
    NytArticleObj,
} from "../../../../typesAndInterfaces/apiTandI";
import { extractTime } from "../extractTime";

export const filterNytNewswireApiJson = (
    jsonData: any,
    isWidgetCard: boolean,
    isGeneralCategory: boolean
) => {
    let newDataArray: NewDataArray = [];

    jsonData.results.forEach((articleObj: NytArticleObj) => {
        const isValidSection =
            articleObj.section && articleObj.section !== "En español";
        const isValidMultimediaArray =
            Array.isArray(articleObj.multimedia) &&
            articleObj.multimedia.length > 0;

        if (isValidMultimediaArray && articleObj.byline && isValidSection) {
            const correctMultimediaObject: NytMultimediaObj | undefined =
                articleObj.multimedia.find((multimediaObject) => {
                    if (multimediaObject.width === 440) {
                        return true;
                    } else if (multimediaObject.width === 600) {
                        return true;
                    }
                    return false;
                });

            const multimediaURL = correctMultimediaObject
                ? correctMultimediaObject.url
                : "";

            if (multimediaURL) {
                const mapped: FilteredArticleObject = {
                    url: articleObj.url,
                    title: articleObj.title,
                    byline: articleObj.byline,
                    section: isGeneralCategory
                        ? "General"
                        : articleObj.section,
                    timestamp: !isWidgetCard
                        ? articleObj.created_date
                        : extractTime(articleObj.created_date),
                    img_src: multimediaURL,
                    isFavorite: false,
                };

                newDataArray.push(mapped);
            }
        }
    });

    return newDataArray;
};
