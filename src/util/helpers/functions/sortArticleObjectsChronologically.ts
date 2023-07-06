import { NewDataArray } from "../../../typesAndInterfaces/typesAndInterfaces";

export const sortArticleObjectsChronologically = (articleArray: NewDataArray) => {
    return articleArray.sort((a, b) => {
        const timestampA = new Date(a.timestamp);
        const timestampB = new Date(b.timestamp);
        return timestampB.getTime() - timestampA.getTime();
    })
};