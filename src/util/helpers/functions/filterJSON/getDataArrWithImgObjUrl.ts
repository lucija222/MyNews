import { createObjUrl } from "./createObjUrl";
import { mergeDataAndObjUrls } from "./mergeDataAndObjUrls";
import { NewDataArray } from "../../../../typesAndInterfaces/apiTandI";

export const getDataArrWithImgObjUrl = async (
    pendingFetches: Promise<Response>[],
    filteredArray_NoObjSrc: NewDataArray
) => {
    const responses = await Promise.all(pendingFetches);
    const objUrlArray = await createObjUrl(responses);
    const resolvedObjUrls = await Promise.all(objUrlArray);
    const completeArray = mergeDataAndObjUrls(
        filteredArray_NoObjSrc,
        resolvedObjUrls
    );

    return completeArray;
};
