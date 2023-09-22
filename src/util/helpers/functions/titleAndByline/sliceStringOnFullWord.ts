export const sliceStringOnFullWord = (
    string: string,
    maxLength: number,
) => {

    let slicedString = string.slice(0, maxLength);
    const lastWhiteSpaceIndex = slicedString.lastIndexOf(" ");

    if (lastWhiteSpaceIndex !== -1) {
        slicedString = slicedString.slice(0, lastWhiteSpaceIndex);
    }

    return slicedString;
};