import { addElipsis } from "./addElipsis";
import { sliceStringOnFullWord } from "./sliceStringOnFullWord";

export const sliceStringAddElipsis = (string: string, maxLength: number) => {
    let slicedString = sliceStringOnFullWord(string, maxLength);

    return addElipsis(slicedString);
};
