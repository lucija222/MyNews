import { Multimedia, NewDataArray, filtered_Newswire } from "../../../interfaces&types/NYT_API_interface";

export const filterJsonData = (jsonData: any) => {
    let newDataArray: NewDataArray | null = null;

    jsonData.results.forEach(
        (articleObject: filtered_Newswire, index: number) => {
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
                                // console.log("M_URL - case 400");
                                return true;
                            } else if (multimediaObject.width === 600) {
                                // console.log("M_URL - case 600");
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
                    // timestamp: articleObject.created_date,
                    timestamp: "14:30", //Change this later
                    img_src: filteredMultimedia_URL,
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