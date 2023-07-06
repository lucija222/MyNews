import { Multimedia, NewDataArray, filteredAPIdata } from "../../../typesAndInterfaces/typesAndInterfaces";
import { extractTime } from "./extractTime";
import { sortArticleObjectsChronologically } from "./sortArticleObjectsChronologically";

interface FilteredArticleObject {
    url: string;
    title: string;
    byline: string;
    section: string;
    timestamp: string;
    img_src: string;
    isFavorite: boolean;
}

export const filterJsonData = (jsonData: any, URL: string) => {
    let newDataArray: NewDataArray | null = null;
    const isHomepageData = URL.includes("api.nytimes.com/svc/topstories/v2/home.json");
    
    jsonData.results.forEach(
        (articleObject: filteredAPIdata) => {
            if (
                Array.isArray(articleObject.multimedia) &&
                articleObject.multimedia.length > 0 &&
                articleObject.byline &&
                articleObject.section
            ) {
                const filteredMultimedia_Array: Multimedia | undefined =
                    articleObject.multimedia.find(
                        (multimediaObject) => {
                            if (multimediaObject.width === 440) {
                                return true;
                            } else if (multimediaObject.width === 600) {
                                return true;
                            }
                            return false;
                        }
                    );

                const filteredMultimedia_URL = filteredMultimedia_Array
                    ? filteredMultimedia_Array.url
                    : "filteredMultimedia_URL undefined";

                const mapped: FilteredArticleObject = {
                    url: articleObject.url,
                    title: articleObject.title,
                    byline: articleObject.byline,
                    section: articleObject.section,
                    timestamp: isHomepageData ? articleObject.created_date : extractTime(articleObject.created_date),
                    img_src: filteredMultimedia_URL,
                    isFavorite: false
                };

                if (!newDataArray) {
                    newDataArray = [mapped];
                } else {
                    newDataArray.push(mapped);
                }
            }
        }
    );

    if (newDataArray && isHomepageData) {
        const chronologicalNewDataArray = sortArticleObjectsChronologically(newDataArray);
        const finalnewDataArray = chronologicalNewDataArray.map((articleObj: FilteredArticleObject) => {
            return {
                ...articleObj,
                timestamp: extractTime(articleObj.timestamp)
            }
        });
        newDataArray = finalnewDataArray;
    }
    
    return newDataArray;
}