import { NewDataArray } from "../../../../typesAndInterfaces/apiTandI";

export const mergeDataAndObjUrls = (filteredArray_NoObjSrc: NewDataArray, resolvedObjUrls: string[]) => {   
    const completeArray = filteredArray_NoObjSrc.map((articleObj, index) => {
        return { ...articleObj, img_objSrc: resolvedObjUrls[index] };
    });

    return completeArray;
};