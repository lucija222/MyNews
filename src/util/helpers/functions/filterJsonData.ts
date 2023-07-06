import { Multimedia, NewDataArray, filteredAPIdata } from "../../../typesAndInterfaces/typesAndInterfaces";
import { extractTime } from "./extractTime";

export const filterJsonData = (jsonData: any) => {
    let newDataArray: NewDataArray | null = null;
    console.log("JSON", jsonData);
    
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

                const mapped = {
                    url: articleObject.url,
                    title: articleObject.title,
                    byline: articleObject.byline,
                    section: articleObject.section,
                    timestamp: extractTime(articleObject.created_date),
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

    return newDataArray;
}