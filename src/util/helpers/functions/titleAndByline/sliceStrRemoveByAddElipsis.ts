import { addElipsis } from "./addElipsis";
import { removeByFromByline } from "./removeByFromByline";
import { sliceStringOnFullWord } from "./sliceStringOnFullWord";

export const sliceStrRemoveByAddElipsis = (
    string: string,
    maxLength: number,
) => {

    let slicedString = sliceStringOnFullWord(string, maxLength);

    slicedString = removeByFromByline(slicedString);

    return addElipsis(slicedString);
};
